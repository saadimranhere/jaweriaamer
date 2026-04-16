/**
 * Single source of truth for phone, WhatsApp, social links, and message templates.
 * Import `contact` and helpers only — do not hardcode outbound URLs elsewhere.
 */

export const contact = {
  phone: "+923253708069",
  /** Digits only (country code + number, no +). Used for wa.me links. */
  whatsapp: "923253708069",
  whatsappGroup: "https://chat.whatsapp.com/G5sHrVqzo7NCSUMhSh9w3U",
  youtube: "https://www.youtube.com/@englishwithjaweria",
  /** Channel ID for @englishwithjaweria — used for uploads embed (latest video). */
  youtubeChannelId: "UCX7iH9axfDiyLrMdoC0HBiQ",
  drive: "https://drive.google.com/drive/folders/1B3MN_5TiHfknp6Ao4BwlFRlmc89F1AHF",
  instagram: "https://instagram.com/englishwithjaweria",
  /** Public Facebook page — leave empty to hide the Facebook card on marketing pages. */
  facebook: "",
  email: "jaweriaamer001@gmail.com",
  /** Default inquiry (general courses / clarity call). */
  messageDefault:
    "Hi, I'd like to learn more about your English courses.",
  /** Workshop / event registration CTA from banners and sticky bar. */
  messageWorkshopRegister:
    "Hi, I want to reserve my spot for the English Writing Workshop. Please share details.",
  /** Public-facing location line (footer, etc.). */
  locationLine: "Karachi, Pakistan",
} as const;

export function telUrl(): string {
  return `tel:${contact.phone.replace(/\s/g, "")}`;
}

export function whatsAppUrl(message?: string): string {
  const text = message ?? contact.messageDefault;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Invite link for the official student / parent WhatsApp community. */
export function whatsAppGroupUrl(): string {
  return contact.whatsappGroup;
}

export function workshopRegisterUrl(): string {
  return whatsAppUrl(contact.messageWorkshopRegister);
}

/** Channel uploads embed (newest first). `autoplay=0`. */
export function youtubeLatestEmbedSrc(): string {
  const id = contact.youtubeChannelId;
  return `https://www.youtube.com/embed?listType=user_uploads&list=${encodeURIComponent(id)}&autoplay=0`;
}
