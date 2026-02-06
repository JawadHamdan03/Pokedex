import { createInterface } from "readline";
import { Cache } from "./pokecache.js";
import { PokeAPI } from "./pokeapi.js";
import { registerCommands } from "./registerCommands.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>  
};

export type State = {
  rl: ReturnType<typeof createInterface>;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const cache = new Cache(60_000);
  const pokeapi = new PokeAPI(cache);

  const state: State = {
    rl,
    commands: {},
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
  };

  registerCommands(state); 

  return state;
}

