import {defineConfig, mergeConfig} from "vite";
import {getBaseViteConfig} from "../../vite.base.config.js";

import pkgJSON from "./package.json";

export default mergeConfig(
  getBaseViteConfig(pkgJSON, {libName: "LightClient", entry: "src/index.ts"}),
  defineConfig({
    build: {
      rollupOptions: {
        output: {
          footer: `
        globalThis.lodestar = globalThis.lodestar === undefined ? {} : globalThis.lodestar;
        globalThis.lodestar.lightclient = {
          Lightclient,
          LightclientEvent,
          RunStatusCode,
          upgradeLightClientFinalityUpdate,
          upgradeLightClientOptimisticUpdate,
          utils,
          transport,
          validation
        };
        `,
        },
      },
    },
  })
);
