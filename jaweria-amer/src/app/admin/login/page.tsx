"use client";

import { useActionState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginAction } from "@/lib/admin/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-white/50 text-sm mt-1">Jaweria Amer - English Specialist</p>
        </div>

        <form action={action} className="bg-white rounded-xl p-6 shadow-xl space-y-4">
          {state?.error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-200">
              {state.error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-navy">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-light" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@jaweriaamer.com"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium text-navy">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-light" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-light hover:text-navy"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={pending} className="w-full bg-navy hover:bg-navy-light text-white">
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          Protected admin area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
