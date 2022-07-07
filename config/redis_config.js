require('dotenv').config();
const redis = require('redis');

const redisPort = process.env.REDIS_PORT;

const connectRedis =  async () => {}
  const redisClient = redis.createClient({
  host: 'http://localhost',
  port: redisPort
});

redisClient.on('error', (err) => {
  console.log(err);
});
redisClient.connect();

module.exports = redisClient;