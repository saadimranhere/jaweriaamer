"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function WhatsAppButton() {
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
