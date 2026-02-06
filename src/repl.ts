import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const cleaned = input.toLowerCase().trim();
  if (cleaned === "") return [];
  return cleaned.split(/\s+/);
}

export function startREPL(state: State) {
  const rl = state.rl;

  rl.prompt();

  rl.on("line", async (line) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const args = words.slice(1);
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...args);
    } catch (err) {
      console.log((err as Error).message);
    }

    rl.prompt();
  });
}

