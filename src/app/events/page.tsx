import { EventsDirectory } from "@/components/events-directory";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function EventsPage() {
  return <><SiteHeader /><main id="main-content" className="page-surface"><EventsDirectory /></main><SiteFooter /></>;
}
