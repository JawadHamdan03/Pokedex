import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName?: string,
): Promise<void> {
  if (!pokemonName) {
    console.log("Please provide a pokemon name");
    return;
  }

  const name = pokemonName.toLowerCase();
  console.log(`Throwing a Pokeball at ${name}...`);

  const pokemon = await state.pokeAPI.fetchPokemon(name);

  const base = pokemon.base_experience ?? 0;
  const catchChance = Math.max(0.2, Math.min(0.8, 1 - base / 400));

  if (Math.random() < catchChance) {
    state.pokedex[name] = pokemon;
    console.log(`${name} was caught!`);
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${name} escaped!`);
  }
}

