import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  cache: Cache;
  pokedex: Record<string, Pokemon>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();

  const cache = new Cache(5 * 60 * 1000); 

  return {
    rl,
    commands,
    cache,
    pokeAPI: new PokeAPI(cache),
    pokedex: {},
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}

