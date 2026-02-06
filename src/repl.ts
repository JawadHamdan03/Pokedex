import readline from "readline";
import { cleanInput } from "./repl-utils.js";
import type { CLICommand } from "./command.js";
import { getCommands } from "./commands.js";

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands: Record<string, CLICommand> = getCommands();

  rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(commands);
      } catch (err) {
        console.error("Error executing command:", err);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}

