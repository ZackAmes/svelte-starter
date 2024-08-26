import "./app.css";
import App from "./App.svelte";
import { setup, type SetupResult } from "./dojo/setup";
import { dojoConfig } from "../dojoConfig";
import { writable } from "svelte/store";

// Create a writable store for the setup result
export const setupStore = writable<SetupResult>();

async function initApp() {
  // Update the store with the setup result
  setupStore.set(await setup(dojoConfig));

  console.log("App initialized");

  const app = new App({
    target: document.getElementById("app")!,
  });

  return app;
}

export default initApp();
