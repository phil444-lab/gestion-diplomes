require('dotenv').config();
const { create } = require('ipfs-http-client');

const ipfs = create({
  host: process.env.IPFS_API_HOST || 'localhost',
  port: parseInt(process.env.IPFS_API_PORT) || 5001,
  protocol: process.env.IPFS_API_HOST === '127.0.0.1' ? 'http' : 'https',
  timeout: '2m'
});

module.exports = ipfs;