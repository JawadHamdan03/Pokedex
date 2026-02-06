import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type LocationArea = {
  name: string;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
};

export type Location = LocationArea;

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  types: Array<{
    type: { name: string };
  }>;
};

export class PokeAPI {
  static baseURL = "https://pokeapi.co/api/v2";

  cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(
        `Failed to fetch locations: ${resp.status} ${resp.statusText}`,
      );
    }

    const data = (await resp.json()) as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) return cached;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(
        `Failed to fetch location: ${resp.status} ${resp.statusText}`,
      );
    }

    const data = (await resp.json()) as Location;
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) return cached;

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(
        `Failed to fetch pokemon: ${resp.status} ${resp.statusText}`,
      );
    }

    const data = (await resp.json()) as Pokemon;
    this.cache.add(url, data);
    return data;
  }
}
