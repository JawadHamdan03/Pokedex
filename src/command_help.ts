import type { State } from "./state.js";

export function commandHelp(state: State): void {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  for (const key in state.commands) {
    console.log(`${state.commands[key].name}: ${state.commands[key].description}`);
  }
}

