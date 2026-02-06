import type { State } from "./state.js";

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();

  rl.on("line", (input: string) => {
    const words = input.trim().toLowerCase().split(/\s+/);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(state);
      } catch (err) {
        console.error("Error executing command:", err);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}

