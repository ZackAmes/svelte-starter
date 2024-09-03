import { writable } from "svelte/store";
import { type SetupResult } from "./dojo/setup";

export const dojoStore = writable<SetupResult>();
