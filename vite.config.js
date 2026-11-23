import { defineConfig } from "vite";

function sharedPlugin() {
  // On globalThis because Vite loads this file once per environment.
  globalThis.instanceCount = (globalThis.instanceCount ?? 0) + 1;
  const instance = globalThis.instanceCount;
  let isConfigResolved = false;

  return {
    name: "shared-plugin",
    sharedDuringBuild: true,
    configResolved() {
      isConfigResolved = true;
      console.log(`configResolved     -> instance ${instance}`);
    },
    generateBundle() {
      console.log(
        `generateBundle     -> instance ${instance} (configResolved ran: ${isConfigResolved})`,
      );
    },
    transformIndexHtml() {
      console.log(
        `transformIndexHtml -> instance ${instance} (configResolved ran: ${isConfigResolved})`,
      );
    },
  };
}

export default defineConfig({
  plugins: [sharedPlugin()],
  // Remove `builder` and every hook runs on the same instance.
  builder: {},
});
