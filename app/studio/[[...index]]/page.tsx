// This is where the studio component is mounted.
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}

// Required for static export of catch-all dynamic route
export async function generateStaticParams() {
  return [];
}
