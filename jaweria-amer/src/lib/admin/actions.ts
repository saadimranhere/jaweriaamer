"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { login, logout } from "./auth";
import {
  saveCourse,
  deleteCourse,
  saveResource,
  updateResourceVisibility,
  deleteResource,
  updateLeadStatus,
  deleteLead,
  saveSettings,
  type CourseLevel,
  type CourseStatus,
  type ResourceVisibility,
  type ResourceCategory,
  type LeadStatus,
} from "./store";

// --- Auth actions ---

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function loginAction(_prev: unknown, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const result = await login(parsed.data.email, parsed.data.password);
  if (!result.success) {
    return { error: result.error };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// --- Course actions ---

const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(200),
  level: z.enum(["O Level", "A Level", "Literature", "Creative Writing"]),
  price: z.coerce.number().min(0, "Price must be positive").max(1000000),
  status: z.enum(["active", "draft"]),
});

export async function saveCourseAction(_prev: unknown, formData: FormData) {
  const parsed = courseSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    level: formData.get("level"),
    price: formData.get("price"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await saveCourse({
    ...parsed.data,
    level: parsed.data.level as CourseLevel,
    status: parsed.data.status as CourseStatus,
  });

  revalidatePath("/admin/courses");
  return { success: true };
}

export async function deleteCourseAction(id: string) {
  await deleteCourse(id);
  revalidatePath("/admin/courses");
}

// --- Resource actions ---

const resourceSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  category: z.enum(["past-paper", "notes", "marking-scheme", "examiner-report"]),
  visibility: z.enum(["public", "student-only"]),
  fileName: z.string().min(1),
  fileSize: z.coerce.number().min(1).max(50 * 1024 * 1024, "File size must be under 50MB"),
});

export async function saveResourceAction(_prev: unknown, formData: FormData) {
  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    visibility: formData.get("visibility"),
    fileName: formData.get("fileName"),
    fileSize: formData.get("fileSize"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await saveResource({
    ...parsed.data,
    category: parsed.data.category as ResourceCategory,
    visibility: parsed.data.visibility as ResourceVisibility,
  });

  revalidatePath("/admin/resources");
  return { success: true };
}

export async function toggleResourceVisibilityAction(id: string, visibility: ResourceVisibility) {
  await updateResourceVisibility(id, visibility);
  revalidatePath("/admin/resources");
}

export async function deleteResourceAction(id: string) {
  await deleteResource(id);
  revalidatePath("/admin/resources");
}

// --- Lead actions ---

export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  await updateLeadStatus(id, status);
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(id: string) {
  await deleteLead(id);
  revalidatePath("/admin/leads");
}

// --- Settings actions ---

const settingsSchema = z.object({
  whatsappNumber: z.string().min(10, "Invalid phone number").max(15),
  stats: z.array(z.object({
    value: z.string().min(1),
    label: z.string().min(1),
  })).min(1).max(6),
});

export async function saveSettingsAction(_prev: unknown, formData: FormData) {
  const statsCount = parseInt(formData.get("statsCount") as string) || 0;
  const stats = [];
  for (let i = 0; i < statsCount; i++) {
    stats.push({
      value: formData.get(`stat_value_${i}`) as string,
      label: formData.get(`stat_label_${i}`) as string,
    });
  }

  const parsed = settingsSchema.safeParse({
    whatsappNumber: formData.get("whatsappNumber"),
    stats,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await saveSettings(parsed.data);
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
