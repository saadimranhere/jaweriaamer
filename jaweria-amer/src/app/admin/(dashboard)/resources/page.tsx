"use client";

import { useEffect, useState, useActionState, useCallback } from "react";
import { Plus, Trash2, FolderOpen, Eye, EyeOff, FileText } from "lucide-react";
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
import { saveResourceAction, toggleResourceVisibilityAction, deleteResourceAction } from "@/lib/admin/actions";
import type { AdminResource } from "@/lib/admin/store";

const categoryLabels: Record<string, string> = {
  "past-paper": "Past Paper",
  "notes": "Notes",
  "marking-scheme": "Marking Scheme",
  "examiner-report": "Examiner Report",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<AdminResource[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  const fetchResources = useCallback(async () => {
    const res = await fetch("/api/admin/resources");
    const data = await res.json();
    setResources(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchResources(); }, [fetchResources]);

  const [formState, formAction, formPending] = useActionState(async (_prev: unknown, formData: FormData) => {
    const result = await saveResourceAction(_prev, formData);
    if (result?.success) {
      toast.success("Resource uploaded");
      setDialogOpen(false);
      setFileName("");
      setFileSize(0);
      fetchResources();
    }
    return result;
  }, null);

  async function handleToggleVisibility(id: string, current: string) {
    const newVis = current === "public" ? "student-only" : "public";
    setResources((prev) => prev.map((r) => r.id === id ? { ...r, visibility: newVis as "public" | "student-only" } : r));
    toast.success(`Visibility set to ${newVis}`);
    await toggleResourceVisibilityAction(id, newVis as "public" | "student-only");
  }

  async function handleDelete(id: string) {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resource deleted");
    await deleteResourceAction(id);
    fetchResources();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy">Resource Vault</h1>
          <p className="text-sm text-slate mt-1">Upload and manage PDFs and documents</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button
            type="button"
            className="bg-navy hover:bg-navy-light text-white gap-2"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="w-4 h-4" /> Upload Resource
          </Button>
          <DialogContent className="bg-white max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-navy">Upload Resource</DialogTitle>
            </DialogHeader>
            <form action={formAction} className="space-y-4">
              <input type="hidden" name="fileName" value={fileName} />
              <input type="hidden" name="fileSize" value={fileSize} />

              {formState?.error && (
                <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg border border-red-200">{formState.error}</div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <select name="category" id="category" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-white">
                  <option value="past-paper">Past Paper</option>
                  <option value="notes">Notes</option>
                  <option value="marking-scheme">Marking Scheme</option>
                  <option value="examiner-report">Examiner Report</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="visibility">Visibility</Label>
                <select name="visibility" id="visibility" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-white">
                  <option value="public">Public</option>
                  <option value="student-only">Student Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="file">File (PDF)</Label>
                <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} required />
                {fileName && <p className="text-xs text-slate-light">{fileName} ({(fileSize / 1024).toFixed(1)} KB)</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Cancel</Button>
                <Button type="submit" disabled={formPending || !fileName} className="flex-1 bg-navy hover:bg-navy-light text-white">
                  {formPending ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl border border-border/60 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-light text-sm">Loading resources...</div>
        ) : resources.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen className="w-10 h-10 text-slate-light/40 mx-auto mb-3" />
            <p className="text-sm font-medium text-navy mb-1">No resources uploaded</p>
            <p className="text-xs text-slate-light mb-4">Upload past papers, notes, and marking schemes.</p>
            <Button onClick={() => setDialogOpen(true)} className="bg-navy hover:bg-navy-light text-white gap-2">
              <Plus className="w-4 h-4" /> Upload Resource
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium text-navy">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-light" />
                      {resource.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate">{categoryLabels[resource.category] || resource.category}</TableCell>
                  <TableCell className="text-xs text-slate-light">{resource.fileName}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleToggleVisibility(resource.id, resource.visibility)}
                      className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 w-fit ${
                        resource.visibility === "public" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {resource.visibility === "public" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {resource.visibility === "public" ? "Public" : "Student Only"}
                    </button>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(resource.id)} className="p-1.5 text-slate hover:text-red-600 rounded hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
