import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CmsDemo, type Panel } from "@/components/cms-demo";

export const metadata: Metadata = {
  title: "CMS & SQL Architecture Demonstration",
  description:
    "Explore how Chelmsford College marketing and curriculum teams manage homepage campaigns, event schedules, and ingest relational SQL course tables dynamically.",
};

export default async function CmsPage({
  searchParams,
}: {
  searchParams: Promise<{ panel?: string }>;
}) {
  const { panel } = await searchParams;
  const initialPanel: Panel = (
    panel && ["dashboard", "content", "campaign", "event", "media", "sql", "evidence"].includes(panel)
      ? panel
      : "dashboard"
  ) as Panel;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface cms-page-surface">
        <CmsDemo initialPanel={initialPanel} />
      </main>
      <SiteFooter />
    </>
  );
}
