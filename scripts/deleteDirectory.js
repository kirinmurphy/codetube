const fs = require('fs');
const path = require('path');

function deleteDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function createDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

const directory = process.argv[2];

if (!directory) {
  console.error('Please provide a directory to clean.');
  process.exit(1);
}

async function deleteAndRecreateDirectory(dir) {
  try {
    await deleteDirectory(dir);
    console.log(`Directory ${dir} deleted successfully.`);
    await createDirectory(dir);
    console.log(`Directory ${dir} created successfully.`);
  } catch (err) {
    console.error('Error cleaning and recreating directory:', err);
  }
}

deleteAndRecreateDirectory(directory);
