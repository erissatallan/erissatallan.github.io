import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { schemaTypes } from "./schemas";
import { projectId, dataset, apiVersion } from "./lib/env.api";
import { dashboardTool } from '@sanity/dashboard';
import path from "path";
import type { UserConfig as ViteConfig } from "vite";

export default defineConfig({
  name: "victoreke",
  title: "victoreke.com",
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion, // pinned to a stable API version
  plugins: [
    deskTool(),
    visionTool(),
    codeInput(),
    table(),
    dashboardTool({
      // @ts-ignore: embeddableOrigins missing from DashboardPluginConfig typings
      embeddableOrigins: [
        'https://erissatallan.github.io',
        'https://www.sanity.io'
      ],
      widgets: []
    }),
  ],
  schema: { types: schemaTypes },
  vite: (prev: ViteConfig): ViteConfig => ({
    ...prev,
    resolve: {
      ...(prev.resolve ?? {}),
      alias: {
        ...(prev.resolve?.alias as Record<string, string>),
        "@": path.resolve(__dirname),
      },
    },
  }),
});
