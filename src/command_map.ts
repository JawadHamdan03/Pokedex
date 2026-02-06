import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);

    data.results.forEach(loc => console.log(loc.name));

    
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
  } catch (err) {
    console.error("Error fetching locations:", err);
  }
}
