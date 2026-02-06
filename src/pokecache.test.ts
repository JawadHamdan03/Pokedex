import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache";

describe("Cache", () => {
  test("adds and gets values", () => {
    const cache = new Cache(1000);
    cache.stopReapLoop();

    cache.add("key", { a: 1 });
    const val = cache.get<{ a: number }>("key");

    expect(val).toBeDefined();
    expect(val?.a).toBe(1);
  });

  test("expires values after interval", async () => {
    const cache = new Cache(10);
    cache.stopReapLoop();

    cache.add("k", "v");
    await new Promise((r) => setTimeout(r, 20));

    const val = cache.get<string>("k");
    expect(val).toBeUndefined();
  });
});

