import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CourseSearch } from "@/components/course-search";

export const metadata: Metadata = {
  title: "Course Directory & Search | Chelmsford College",
  description:
    "Explore all 33 Chelmsford College courses across vocational diplomas, T Levels, and apprenticeships. Filter by subject, level, study mode, illustrative campus, and funding.",
};

type SearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] ?? "" : value ?? "";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-surface">
        <CourseSearch
          initialQuery={first(params.q)}
          initialSubject={first(params.subject)}
          initialLevel={first(params.level)}
          initialMode={first(params.mode)}
          initialCampus={first(params.campus)}
          initialFunding={first(params.funding)}
        />
      </main>
      <SiteFooter />
    </>
  );
}
