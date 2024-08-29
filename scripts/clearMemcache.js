// clearMemcache.js
const memjs = require('memjs');
require('dotenv').config();

async function clearMemcache() {
  const memcachedClient = memjs.Client.create(process.env.MEMCACHIER_SERVERS || '', {
    username: process.env.MEMCACHIER_USERNAME || '',
    password: process.env.MEMCACHIER_PASSWORD || '',
    timeout: 15000, // Increase timeout to 15 seconds
    retries: 2 // Add retries
  });
   
  try {
    console.log('Attempting to clear Memcache...');
    await new Promise((resolve, reject) => {
      memcachedClient.flush((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Memcache cleared successfully');
  } catch (error) {
    console.error('Error clearing Memcache:', error);
    process.exit(1);
  } finally {
    memcachedClient.quit();
  }
}

clearMemcache();
