"use client";

import { useEffect, useState, useActionState, useCallback } from "react";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveCourseAction, deleteCourseAction } from "@/lib/admin/actions";
import type { AdminCourse } from "@/lib/admin/store";

export default function CoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = useCallback(async () => {
    const res = await fetch("/api/admin/courses");
    const data = await res.json();
    setCourses(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const [formState, formAction, formPending] = useActionState(async (_prev: unknown, formData: FormData) => {
    const result = await saveCourseAction(_prev, formData);
    if (result?.success) {
      toast.success(editingCourse ? "Course updated" : "Course created");
      setDialogOpen(false);
      setEditingCourse(null);
      fetchCourses();
    }
    return result;
  }, null);

  async function handleDelete(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast.success("Course deleted");
    await deleteCourseAction(id);
    fetchCourses();
  }

  function openEdit(course: AdminCourse) {
    setEditingCourse(course);
    setDialogOpen(true);
  }

  function openNew() {
    setEditingCourse(null);
    setDialogOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">Courses</h1>
          <p className="text-sm text-slate mt-1">Manage your course catalogue</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditingCourse(null); }}>
          <Button
            type="button"
            onClick={openNew}
            className="bg-navy hover:bg-navy-light text-white gap-2"
          >
            <Plus className="w-4 h-4" /> Add Course
          </Button>
          <DialogContent className="bg-white max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-navy">
                {editingCourse ? "Edit Course" : "New Course"}
              </DialogTitle>
            </DialogHeader>
            <form action={formAction} className="space-y-4">
              {editingCourse && <input type="hidden" name="id" value={editingCourse.id} />}

              {formState?.error && (
                <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-200">{formState.error}</div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingCourse?.title || ""} required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="level">Level</Label>
                <select name="level" id="level" defaultValue={editingCourse?.level || "O Level"} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-white">
                  <option>O Level</option>
                  <option>A Level</option>
                  <option>Literature</option>
                  <option>Creative Writing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="price">Price (PKR)</Label>
                <Input id="price" name="price" type="number" min="0" defaultValue={editingCourse?.price || ""} required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <select name="status" id="status" defaultValue={editingCourse?.status || "draft"} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-white">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Cancel</Button>
                <Button type="submit" disabled={formPending} className="flex-1 bg-navy hover:bg-navy-light text-white">
                  {formPending ? "Saving..." : "Save Course"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl border border-border/60 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-light text-sm">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-light/40 mx-auto mb-3" />
            <p className="text-sm font-medium text-navy mb-1">No courses found</p>
            <p className="text-xs text-slate-light mb-4">Create your first course to get started.</p>
            <Button onClick={openNew} className="bg-navy hover:bg-navy-light text-white gap-2">
              <Plus className="w-4 h-4" /> Add Course
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium text-navy">{course.title}</TableCell>
                  <TableCell className="text-slate">{course.level}</TableCell>
                  <TableCell className="text-slate">PKR {course.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      course.status === "active" ? "bg-green-50 text-green-600" : "bg-slate/10 text-slate"
                    }`}>
                      {course.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(course)} className="p-1.5 text-slate hover:text-navy rounded hover:bg-slate/10 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="p-1.5 text-slate hover:text-red-600 rounded hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
