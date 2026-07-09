export const mainNavigation = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Founder", href: "/about#founder" },
      { label: "Trustees", href: "/about#trustees" },
      { label: "Registrations", href: "/about#registrations" },
    ],
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    children: [
      { label: "Overview", href: "/what-we-do" },
      { label: "Diabetes Care", href: "/what-we-do#diabetes-care" },
      {
        label: "Obesity & Metabolic Medicine",
        href: "/what-we-do#metabolic-medicine",
      },
      { label: "Medical Research", href: "/what-we-do#medical-research" },
      { label: "Medical Education", href: "/what-we-do#medical-education" },
      { label: "Community Health", href: "/what-we-do#community-health" },
      { label: "Scholarships & Training", href: "/what-we-do#scholarships" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Overview", href: "/research" },
      { label: "Ongoing Projects", href: "/research#ongoing-projects" },
      { label: "Completed Studies", href: "/research#completed-studies" },
      { label: "Publications", href: "/research#publications" },
      { label: "Abstracts", href: "/research#abstracts" },
      { label: "Clinical Trials", href: "/research#clinical-trials" },
      { label: "Collaborations", href: "/research#collaborations" },
      { label: "Ethics & Policy", href: "/research#ethics-policy" },
    ],
  },
  {
    label: "Academy",
    href: "/academy",
    children: [
      { label: "Overview", href: "/academy" },
      { label: "Certificate Courses", href: "/academy#certificate-courses" },
      { label: "Fellowship Programs", href: "/academy#fellowship-programs" },
      { label: "Webinars", href: "/academy#webinars" },
      { label: "Conferences", href: "/academy#conferences" },
      { label: "Hands-on Workshops", href: "/academy#workshops" },
      { label: "Online Learning Portal", href: "/academy#online-learning" },
      { label: "Member login", href: "/portal/login" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Overview", href: "/events" },
      { label: "Upcoming Events", href: "/events#upcoming-events" },
      { label: "Gallery", href: "/events/camps" },
      { label: "Campaigns", href: "/events#campaigns" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Overview", href: "/get-involved" },
      { label: "Donate", href: "/get-involved#donate" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
      { label: "CSR Partnerships", href: "/get-involved#csr" },
      { label: "Research Collaboration", href: "/get-involved#research-collaboration" },
      { label: "Internships", href: "/get-involved#internships" },
    ],
  },
] as const;

export const footerNavigation = {
  about: [
    { label: "About the Academy", href: "/about" },
    { label: "Founder's Message", href: "/about#founder" },
    { label: "Board of Trustees", href: "/about#trustees" },
    { label: "Transparency", href: "/transparency" },
  ],
  programmes: [
    { label: "What We Do", href: "/what-we-do" },
    { label: "Research", href: "/research" },
    { label: "Academy", href: "/academy" },
    { label: "Community Outreach", href: "/outreach" },
  ],
  resources: [
    { label: "Publications", href: "/publications" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Media Centre", href: "/media" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
    { label: "Refund Policy", href: "/legal/refund" },
    { label: "Accessibility", href: "/legal/accessibility" },
  ],
} as const;
