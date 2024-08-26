import "./app.css";
import App from "./App.svelte";
import { setup, type SetupResult } from "./dojo/setup";
import { dojoConfig } from "../dojoConfig";
import { writable } from "svelte/store";

// Create a writable store for the setup result
export const setupStore = writable<SetupResult>();

async function initApp() {
  await someAsyncFunction();

  const app = new App({
    target: document.getElementById("app")!,
  });

  return app;
}

export default initApp();

async function someAsyncFunction() {
  const setupResult = await setup(dojoConfig);
  console.log("Setup result:", setupResult);

  // Update the store with the setup result
  setupStore.set(setupResult);
}
