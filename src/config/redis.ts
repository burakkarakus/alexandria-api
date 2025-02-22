import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'redis', 
    // i wanted to use default to internal docker service name and default port
    port: parseInt(process.env.REDIS_PORT || '6379'),
});

redis.on('error', (err) => {
    console.error('Redis Error:', err);
});

export default redis;
