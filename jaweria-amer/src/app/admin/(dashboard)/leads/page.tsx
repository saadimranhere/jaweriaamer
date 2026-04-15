"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, Users, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateLeadStatusAction, deleteLeadAction } from "@/lib/admin/actions";
import type { Lead } from "@/lib/admin/store";

const statusOptions = [
  { value: "new", label: "New", className: "bg-brand-soft text-brand" },
  { value: "contacted", label: "Contacted", className: "bg-amber-50 text-amber-600" },
  { value: "enrolled", label: "Enrolled", className: "bg-green-50 text-green-600" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    const res = await fetch("/api/admin/leads");
    const data = await res.json();
    setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function handleStatusChange(id: string, status: string) {
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: status as Lead["status"] } : l));
    toast.success(`Status updated to ${status}`);
    await updateLeadStatusAction(id, status as Lead["status"]);
  }

  async function handleDelete(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success("Lead removed");
    await deleteLeadAction(id);
    fetchLeads();
  }

  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const enrolledCount = leads.filter((l) => l.status === "enrolled").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-navy">Leads & Inquiries</h1>
        <p className="text-sm text-slate mt-1">Track and manage student inquiries</p>
      </div>

      {!loading && leads.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-lg bg-brand-soft p-3 text-center">
            <p className="font-serif text-xl font-bold text-brand">{newCount}</p>
            <p className="text-xs text-brand/80">New</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <p className="font-serif text-xl font-bold text-amber-600">{contactedCount}</p>
            <p className="text-xs text-amber-600/70">Contacted</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="font-serif text-xl font-bold text-green-600">{enrolledCount}</p>
            <p className="text-xs text-green-600/70">Enrolled</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border/60 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-light text-sm">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-10 h-10 text-slate-light/40 mx-auto mb-3" />
            <p className="text-sm font-medium text-navy mb-1">No new inquiries</p>
            <p className="text-xs text-slate-light">Inquiries from the website will appear here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-navy">{lead.name}</TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-xs text-slate">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-light">
                        <Phone className="w-3 h-3" /> {lead.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate max-w-xs truncate">{lead.message}</TableCell>
                  <TableCell className="text-xs text-slate-light">{lead.source}</TableCell>
                  <TableCell>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer ${
                        statusOptions.find((s) => s.value === lead.status)?.className || ""
                      }`}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(lead.id)} className="p-1.5 text-slate hover:text-red-600 rounded hover:bg-red-50 transition-colors">
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
