import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quickr.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/signin",
          "/signup",
          "/verify-otp",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
