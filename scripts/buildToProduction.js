const { execSync } = require('child_process');

const runCommand = (command) => {
  execSync(command, { stdio: 'inherit' });
};

try {
  if (process.env.RUN_SEED === 'true') {
    runCommand('yarn run seed:prod');
  }
  runCommand('yarn run compileServerFunctions');
  runCommand('yarn run build');
} catch (error) {
  console.error('Error during custom build:', error);
  process.exit(1);
}
