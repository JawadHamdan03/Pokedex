import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  areaName?: string
): Promise<void> {
  if (!areaName) {
    console.log("Please provide a location area name.");
    return;
  }

  console.log(`Exploring ${areaName}...`);

  const location = await state.pokeapi.fetchLocation(areaName);

  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
