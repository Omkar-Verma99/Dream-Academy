function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV !== "production") {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://dreamacademy.drkpchandra.com";
}

export const siteConfig = {
  name: "DREAM Academy",
  fullName:
    "Diabetes Research & Excellence in Advanced Metabolic Medicine Academy",
  description:
    "A registered charitable trust advancing diabetes research, metabolic medicine, medical education, and community health across India.",
  url: resolveSiteUrl(),
  establishedYear: "2019",
  locale: "en-IN",
  contact: {
    address:
      "D-4/658, Vijayant Khand, near Chinhat Tiraha, Gomti Nagar, Lucknow, Uttar Pradesh 226010, India",
    email: "chandradiabetesclinic@gmail.com",
    phones: ["05223593056", "+918604804125"],
    mapUrl:
      "https://maps.app.goo.gl/Z2ZGBek7kJ2dauXr6?g_st=com.google.maps.preview.copy",
    whatsapp: {
      /** E.164 without + for wa.me links */
      number: "918604804125",
      display: "+91 86048 04125",
      defaultMessage:
        "Hello DREAM Academy, I would like to know more about your programmes and services. Please guide me.",
    },
  },
  clinic: {
    name: "Chandra Diabetes Clinic",
    doctor: "Dr. K. P. Chandra",
    specialty: "Internal Medicine & Advanced Diabetes Care",
    address:
      "Chandra Diabetes Clinic, D-4/658, Vijayant Khand, Gomti Nagar, Lucknow, U.P. - 226010",
    hours: {
      weekdays: "10:00 AM - 2:00 PM & 5:00 PM - 8:00 PM",
      days: "Monday to Saturday",
      closed: "Sunday closed",
    },
    appointmentPhones: ["+918604804125", "05223593056"],
  },
  youtube: {
    channelId: "UCXwHzAerW7ehVkMZwOTkBfQ",
    channelName: "Health talks: डॉक्टर की पंचायत",
    url: "https://www.youtube.com/channel/UCXwHzAerW7ehVkMZwOTkBfQ",
  },
  registration: {
    pan: process.env.NEXT_PUBLIC_TRUST_PAN ?? "On request",
    section12A: process.env.NEXT_PUBLIC_TRUST_12A ?? "On request",
    section80G: process.env.NEXT_PUBLIC_TRUST_80G ?? "On request",
    trustDeed: "Registered under Indian Trusts Act, 1882",
  },
} as const;
