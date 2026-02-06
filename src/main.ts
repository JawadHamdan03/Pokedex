import { startREPL } from "./repl.js";
import { initState } from "./state.js";
import { registerCommands } from "./registerCommands.js";

function main() {
  const state = initState();
  registerCommands(state);  
  startREPL(state);
}

main();

