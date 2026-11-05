import type { Metadata } from "next";
import { EventsDirectory } from "@/components/events-directory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "College Events & Open Evenings | Chelmsford College",
  description:
    "Explore upcoming open evenings, technical workshops and taster days across Chelmsford College Moulsham Street and Princes Road campuses. Book your place online.",
};

export default function EventsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface">
        <EventsDirectory />
      </main>
      <SiteFooter />
    </>
  );
}
