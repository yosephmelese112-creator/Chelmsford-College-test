import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CmsDemo } from "@/components/cms-demo";

export default function CmsPage() {
  return <><SiteHeader /><main id="main-content" className="page-surface cms-page-surface"><CmsDemo /></main><SiteFooter /></>;
}
