import { spawn } from "node:child_process";

console.log("Running ESLint, type checker, and unit tests...");
spawn("pnpm", ["test:extended"], {
  shell: true,
  stdio: ["inherit", "inherit", "inherit"],
});
