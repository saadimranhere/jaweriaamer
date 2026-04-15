/**
 * Single source of truth for WhatsApp, email, and outbound message templates.
 * Replace `whatsappE164` with the live number (digits only, country code, no +).
 */

export const contact = {
  whatsappE164: "923001234567",
  email: "hello@jaweriaamer.com",
  /** Default inquiry (general courses / clarity call). */
  messageDefault:
    "Hi, I'd like to learn more about your English courses.",
  /** Workshop / event registration CTA from banners and sticky bar. */
  messageWorkshopRegister:
    "Hi, I want to reserve my spot for the English Writing Workshop. Please share details.",
  /** Public-facing location line (footer, etc.). */
  locationLine: "Karachi, Pakistan",
} as const;

export function whatsAppUrl(message?: string): string {
  const text = message ?? contact.messageDefault;
  return `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(text)}`;
}

export function workshopRegisterUrl(): string {
  return whatsAppUrl(contact.messageWorkshopRegister);
}
