import { NextResponse } from "next/server";
import { courses } from "@/lib/content";
import { db } from "@/db";
import { collegeCourses } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim() || "";
  const subject = searchParams.get("subject") || "";
  const level = searchParams.get("level") || "";
  const mode = searchParams.get("mode") || "";
  const campus = searchParams.get("campus") || "";

  let dataset = courses;

  // If a live database connection exists, query the database table
  if (process.env.DATABASE_URL) {
    try {
      const records = await db.select().from(collegeCourses);
      if (records && records.length > 0) {
        dataset = records.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          qualification: r.qualification,
          level: r.level,
          duration: r.duration,
          mode: r.mode,
          campus: r.campus,
          startDate: r.startDate,
          overview: r.overview,
          entryRequirements: r.entryRequirements ? JSON.parse(r.entryRequirements) : undefined,
          modules: r.modules ? JSON.parse(r.modules) : undefined,
          assessment: r.assessment ?? undefined,
          fees: r.fees ?? undefined,
          progression: r.progression ?? undefined,
          image: r.image,
          imageAlt: r.imageAlt,
        }));
      }
    } catch {
      // Graceful fallback to static catalog
      dataset = courses;
    }
  }

  const filtered = dataset.filter((course) => {
    const matchesSearch =
      !q ||
      `${course.title} ${course.subject} ${course.qualification} ${course.level}`
        .toLowerCase()
        .includes(q);
    return (
      matchesSearch &&
      (!subject || course.subject === subject) &&
      (!level || course.level === level) &&
      (!mode || course.mode === mode) &&
      (!campus || course.campus === campus)
    );
  });

  return NextResponse.json(
    {
      ok: true,
      count: filtered.length,
      data: filtered,
      dataSource: process.env.DATABASE_URL ? "sql_database" : "content_catalog",
      cacheStatus: "fresh",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
