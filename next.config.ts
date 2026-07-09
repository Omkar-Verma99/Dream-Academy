import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about/founder", destination: "/about#founder", permanent: true },
      {
        source: "/about/vision-mission",
        destination: "/about#vision-mission",
        permanent: true,
      },
      { source: "/about/trustees", destination: "/about#trustees", permanent: true },
      {
        source: "/about/registrations",
        destination: "/about#registrations",
        permanent: true,
      },
      {
        source: "/academy/courses",
        destination: "/academy#certificate-courses",
        permanent: true,
      },
      {
        source: "/academy/fellowships",
        destination: "/academy#fellowship-programs",
        permanent: true,
      },
      { source: "/academy/webinars", destination: "/academy#webinars", permanent: true },
      {
        source: "/academy/conferences",
        destination: "/academy#conferences",
        permanent: true,
      },
      {
        source: "/academy/workshops",
        destination: "/academy#workshops",
        permanent: true,
      },
      {
        source: "/academy/online-learning",
        destination: "/academy#online-learning",
        permanent: true,
      },
      {
        source: "/research/clinical-trials",
        destination: "/research#clinical-trials",
        permanent: true,
      },
      {
        source: "/research/collaborations",
        destination: "/research#collaborations",
        permanent: true,
      },
      {
        source: "/research/ethics-policy",
        destination: "/research#ethics-policy",
        permanent: true,
      },
      {
        source: "/research/projects",
        destination: "/research#ongoing-projects",
        permanent: true,
      },
      {
        source: "/research/projects/:slug",
        destination: "/research#ongoing-projects",
        permanent: true,
      },
      {
        source: "/research/publications",
        destination: "/research#publications",
        permanent: true,
      },
      {
        source: "/research/publications/:slug",
        destination: "/research#publications",
        permanent: true,
      },
      {
        source: "/events/campaigns",
        destination: "/events#campaigns",
        permanent: true,
      },
      {
        source: "/events/upcoming",
        destination: "/events#upcoming-events",
        permanent: true,
      },
      {
        source: "/events/gallery",
        destination: "/events/camps",
        permanent: true,
      },
      {
        source: "/get-involved/donate",
        destination: "/get-involved#donate",
        permanent: true,
      },
      {
        source: "/get-involved/volunteer",
        destination: "/get-involved#volunteer",
        permanent: true,
      },
      { source: "/get-involved/csr", destination: "/get-involved#csr", permanent: true },
      {
        source: "/get-involved/internships",
        destination: "/get-involved#internships",
        permanent: true,
      },
      {
        source: "/get-involved/research-collaboration",
        destination: "/get-involved#research-collaboration",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com",
              "img-src 'self' data: https://cdn.sanity.io https://res.cloudinary.com https://img.youtube.com",
              "frame-src https://iframe.videodelivery.net https://checkout.razorpay.com https://www.google.com https://maps.google.com https://www.youtube-nocookie.com https://www.youtube.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
