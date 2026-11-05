import { spawn } from "node:child_process";
import fs from "node:fs";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const axeSource = fs.readFileSync("./node_modules/axe-core/axe.min.js", "utf-8");

const routes = [
  "/",
  "/courses",
  "/courses/fashion-l3",
  "/courses/digital-it-l2",
  "/events",
  "/events/showcase-open-evening",
  "/payments",
  "/cms",
  "/design-system",
  "/for/employers",
];

const viewports = [
  { name: "desktop", width: 1280, height: 800, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200 || res.status === 304) return true;
    } catch {
      // wait
    }
    await sleep(250);
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

async function runAudit() {
  console.log("Starting Next.js production server on port 3009...");
  const nextProcess = spawn("npx", ["next", "start", "-p", "3009"], {
    stdio: "inherit",
    env: { ...process.env, PORT: "3009", NODE_ENV: "production" },
  });

  console.log("Starting Headless Chrome...");
  const chromeProcess = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--user-data-dir=/tmp/chrome-test-profile-" + Date.now(),
  ]);

  let totalViolations = 0;
  let totalOverflows = 0;

  try {
    await waitForServer("http://127.0.0.1:3009");
    await waitForServer("http://127.0.0.1:9222/json/version");

    const versionRes = await fetch("http://127.0.0.1:9222/json/version");
    const versionData = await versionRes.json();
    const webSocketDebuggerUrl = versionData.webSocketDebuggerUrl;

    const ws = new globalThis.WebSocket(webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    const pendingCalls = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pendingCalls.has(data.id)) {
        const { resolve, reject } = pendingCalls.get(data.id);
        pendingCalls.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pendingCalls.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    // Create a target / page
    const target = await sendCommand("Target.createTarget", { url: "about:blank" });
    const targetId = target.targetId;

    // Connect directly to page target
    const targetsRes = await fetch("http://127.0.0.1:9222/json");
    const targets = await targetsRes.json();
    const pageTarget = targets.find((t) => t.id === targetId || t.type === "page");

    const pageWs = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      pageWs.onopen = resolve;
      pageWs.onerror = reject;
    });

    const pagePending = new Map();
    pageWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pagePending.has(data.id)) {
        const { resolve, reject } = pagePending.get(data.id);
        pagePending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    function callPage(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pagePending.set(id, { resolve, reject });
        pageWs.send(JSON.stringify({ id, method, params }));
      });
    }

    await callPage("Page.enable");
    await callPage("Runtime.enable");

    console.log("\n=======================================================");
    console.log("   AUTOMATED AXE-CORE & RESPONSIVE OVERFLOW AUDIT");
    console.log("=======================================================\n");

    for (const route of routes) {
      for (const vp of viewports) {
        // Set viewport
        await callPage("Emulation.setDeviceMetricsOverride", {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.mobile,
        });

        // Navigate
        const targetUrl = `http://127.0.0.1:3009${route}`;
        await callPage("Page.navigate", { url: targetUrl });
        await sleep(800); // Wait for React hydration and render

        // Check horizontal overflow
        const overflowEval = await callPage("Runtime.evaluate", {
          expression: `JSON.stringify({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            innerWidth: window.innerWidth,
            overflow: document.documentElement.scrollWidth > window.innerWidth
          })`,
          returnByValue: true,
        });
        const overflowResult = JSON.parse(overflowEval.result.value);

        // Inject axe
        await callPage("Runtime.evaluate", { expression: axeSource });

        // Run axe
        const axeEval = await callPage("Runtime.evaluate", {
          expression: `new Promise((resolve) => {
            axe.run({
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
              }
            }).then((results) => {
              resolve(JSON.stringify(results.violations));
            });
          })`,
          awaitPromise: true,
          returnByValue: true,
        });

        const violations = JSON.parse(axeEval.result.value || "[]");

        const statusSymbol = violations.length === 0 && !overflowResult.overflow ? "✓ PASS" : "✗ FAIL";
        console.log(
          `${statusSymbol} [${vp.name.toUpperCase()} ${vp.width}px] ${route} — axe violations: ${violations.length}, overflow: ${
            overflowResult.overflow ? `YES (${overflowResult.scrollWidth}px vs ${overflowResult.innerWidth}px)` : "No"
          }`
        );

        if (overflowResult.overflow) {
          totalOverflows++;
        }

        if (violations.length > 0) {
          totalViolations += violations.length;
          violations.forEach((v) => {
            console.log(`    - [${v.impact}] ${v.id}: ${v.description}`);
            v.nodes.slice(0, 3).forEach((n) => {
              console.log(`      Node: ${n.html.slice(0, 100)}`);
              console.log(`      Failure summary: ${n.failureSummary}`);
            });
          });
        }
      }
    }

    console.log("\n=======================================================");
    console.log(`Audit Complete: ${totalViolations} axe violations, ${totalOverflows} horizontal overflows.`);
    console.log("=======================================================\n");

    pageWs.close();
    ws.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    try {
      chromeProcess.kill();
    } catch {}
    try {
      nextProcess.kill();
    } catch {}
    process.exit(totalViolations + totalOverflows > 0 ? 1 : 0);
  }
}

runAudit();
