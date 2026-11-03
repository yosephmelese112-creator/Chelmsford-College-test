import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
