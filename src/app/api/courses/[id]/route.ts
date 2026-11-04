import { NextResponse } from "next/server";
import { courseById } from "@/lib/content";
import { db } from "@/db";
import { collegeCourses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (process.env.DATABASE_URL) {
    try {
      const records = await db
        .select()
        .from(collegeCourses)
        .where(eq(collegeCourses.id, id))
        .limit(1);

      if (records && records.length > 0) {
        const r = records[0];
        const course = {
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
        };
        return NextResponse.json({
          ok: true,
          data: course,
          dataSource: "sql_database",
        });
      }
    } catch {
      // Fallback to static catalog below
    }
  }

  const course = courseById(id);
  if (!course) {
    return NextResponse.json(
      { ok: false, message: "Course not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    data: course,
    dataSource: "content_catalog",
  });
}

