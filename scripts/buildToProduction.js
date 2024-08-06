const { execSync } = require('child_process');

const runCommand = (command) => {
  execSync(command, { stdio: 'inherit' });
};

try {
  runCommand('yarn run compileServerFunctions');
  runCommand('yarn run build');
  if (process.env.RUN_SEED === 'true') {
    runCommand('yarn run seed:prod');
  }
} catch (error) {
  console.error('Error during custom build:', error);
  process.exit(1);
}
