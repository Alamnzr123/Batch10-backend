/* eslint-disable indent */
// const redis = require('redis');

// let redisClient;

// (async () => {
//     redisClient = redis.createClient();

//     redisClient.on('error', (error) => console.error(`Error : ${error}`));

//     await redisClient.connect();
// })();

const { createClient } = require('redis');

// REDIS
const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

module.exports = client;