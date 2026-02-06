import type { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
  try {
    if (!state.prevLocationsURL) {
      console.log("You're on the first page");
      return;
    }

    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL ?? undefined);

    data.results.forEach(loc => console.log(loc.name));

    
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
  } catch (err) {
    console.error("Error fetching previous locations:", err);
  }
}

