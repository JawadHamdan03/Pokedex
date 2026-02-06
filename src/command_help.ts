import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  for (const key in state.commands) {
    console.log(`${state.commands[key].name}: ${state.commands[key].description}`);
  }
}

