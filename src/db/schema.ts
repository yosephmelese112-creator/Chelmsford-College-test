import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const collegeCourses = pgTable("college_courses", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  subject: varchar("subject", { length: 120 }).notNull(),
  qualification: varchar("qualification", { length: 300 }).notNull(),
  level: varchar("level", { length: 40 }).notNull(),
  duration: varchar("duration", { length: 60 }).notNull(),
  mode: varchar("mode", { length: 60 }).notNull(),
  campus: varchar("campus", { length: 160 }).notNull(),
  startDate: varchar("start_date", { length: 60 }).notNull(),
  overview: text("overview").notNull(),
  entryRequirements: text("entry_requirements"),
  modules: text("modules"),
  assessment: text("assessment"),
  fees: text("fees"),
  progression: text("progression"),
  image: varchar("image", { length: 255 }).notNull(),
  imageAlt: text("image_alt").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const courseEnquiries = pgTable("college_course_enquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  telephone: varchar("telephone", { length: 40 }),
  kind: varchar("kind", { length: 32 }).notNull().default("enquiry"),
  courseId: varchar("course_id", { length: 100 }),
  courseTitle: varchar("course_title", { length: 300 }),
  message: text("message"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const eventRegistrations = pgTable("college_event_registrations", {
  id: serial("id").primaryKey(),
  eventSlug: varchar("event_slug", { length: 120 }).notNull(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  telephone: varchar("telephone", { length: 40 }),
  guests: integer("guests").notNull().default(1),
  subjectInterest: varchar("subject_interest", { length: 120 }),
  presentationSlot: varchar("presentation_slot", { length: 120 }),
  consent: boolean("consent").notNull().default(false),
  reference: varchar("reference", { length: 40 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
