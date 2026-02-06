import { CLICommand, State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";


export function registerCommands(state: State) {
  state.commands.exit = {
    name: "exit",
    description: "Exits the Pokedex",
    callback: commandExit,
  };

  state.commands.help = {
    name: "help",
    description: "Displays a help message",
    callback: commandHelp,
  };

}
