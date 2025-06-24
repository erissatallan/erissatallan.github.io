import "server-only";
import { createClient, type ClientConfig, type QueryParams } from "next-sanity";
import { projectId, dataset, mode } from "@/lib/env.api";

// Pinning to a specific, stable API version to avoid experimental warnings
const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion: '2025-06-24',    // ← YYYY‑MM‑DD of a released API version
  useCdn: mode === "development",   // use the CDN in dev, cache in prod
  ignoreBrowserTokenWarning: true,
  perspective: "published",
};

const client = createClient(config);

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: mode === "development" ? "no-store" : "force-cache",
    next: { tags },
  });
}
