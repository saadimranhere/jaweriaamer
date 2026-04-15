import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

async function readJSON<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  try {
    const raw = await readFile(join(DATA_DIR, filename), "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJSON<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  await writeFile(join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

// --- Course types & operations ---

export type CourseStatus = "active" | "draft";
export type CourseLevel = "O Level" | "A Level" | "Literature" | "Creative Writing";

export interface AdminCourse {
  id: string;
  title: string;
  level: CourseLevel;
  price: number;
  status: CourseStatus;
  syllabusFile?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCourses(): Promise<AdminCourse[]> {
  return readJSON<AdminCourse[]>("courses.json", []);
}

export async function getCourse(id: string): Promise<AdminCourse | undefined> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id);
}

export async function saveCourse(course: Omit<AdminCourse, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<AdminCourse> {
  const courses = await getCourses();
  const now = new Date().toISOString();

  if (course.id) {
    const index = courses.findIndex((c) => c.id === course.id);
    if (index >= 0) {
      courses[index] = { ...courses[index], ...course, id: course.id, updatedAt: now };
      await writeJSON("courses.json", courses);
      return courses[index];
    }
  }

  const newCourse: AdminCourse = {
    ...course,
    id: `course-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };
  courses.push(newCourse);
  await writeJSON("courses.json", courses);
  return newCourse;
}

export async function deleteCourse(id: string): Promise<void> {
  const courses = await getCourses();
  await writeJSON("courses.json", courses.filter((c) => c.id !== id));
}

// --- Resource types & operations ---

export type ResourceVisibility = "public" | "student-only";
export type ResourceCategory = "past-paper" | "notes" | "marking-scheme" | "examiner-report";

export interface AdminResource {
  id: string;
  title: string;
  category: ResourceCategory;
  visibility: ResourceVisibility;
  fileName: string;
  fileSize: number;
  createdAt: string;
}

export async function getResources(): Promise<AdminResource[]> {
  return readJSON<AdminResource[]>("resources.json", []);
}

export async function saveResource(resource: Omit<AdminResource, "id" | "createdAt">): Promise<AdminResource> {
  const resources = await getResources();
  const newResource: AdminResource = {
    ...resource,
    id: `res-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  resources.push(newResource);
  await writeJSON("resources.json", resources);
  return newResource;
}

export async function updateResourceVisibility(id: string, visibility: ResourceVisibility): Promise<void> {
  const resources = await getResources();
  const index = resources.findIndex((r) => r.id === id);
  if (index >= 0) {
    resources[index].visibility = visibility;
    await writeJSON("resources.json", resources);
  }
}

export async function deleteResource(id: string): Promise<void> {
  const resources = await getResources();
  await writeJSON("resources.json", resources.filter((r) => r.id !== id));
}

// --- Lead types & operations ---

export type LeadStatus = "new" | "contacted" | "enrolled";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
}

export async function getLeads(): Promise<Lead[]> {
  return readJSON<Lead[]>("leads.json", []);
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index >= 0) {
    leads[index].status = status;
    await writeJSON("leads.json", leads);
  }
}

export async function deleteLead(id: string): Promise<void> {
  const leads = await getLeads();
  await writeJSON("leads.json", leads.filter((l) => l.id !== id));
}

// --- Site Settings ---

export interface SiteSettings {
  whatsappNumber: string;
  stats: { value: string; label: string }[];
}

const defaultSettings: SiteSettings = {
  whatsappNumber: "923253708069",
  stats: [
    { value: "95%", label: "Students scored A*/A" },
    { value: "500+", label: "Students mentored" },
    { value: "8+", label: "Years of experience" },
    { value: "12", label: "CAIE exam sessions" },
  ],
};

export async function getSettings(): Promise<SiteSettings> {
  return readJSON<SiteSettings>("settings.json", defaultSettings);
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeJSON("settings.json", settings);
}
