import { spawn } from 'node:child_process'

console.log('Running ESLint, type checker, and unit tests...')
spawn('pnpm', ['test:cy'], {
  shell: true,
  stdio: ['inherit', 'inherit', 'inherit'],
})
