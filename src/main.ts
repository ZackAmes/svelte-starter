import "./app.css";
import App from "./App.svelte";
import { setup } from "./dojo/setup";
import { dojoConfig } from "../dojoConfig";
import { dojoStore } from "./stores";

// Create a writable store for the setup result

async function initApp() {
  // Update the store with the setup result
  dojoStore.set(await setup(dojoConfig));

  console.log("App initialized");

  const app = new App({
    target: document.getElementById("app")!,
  });

  return app;
}

export default initApp();
