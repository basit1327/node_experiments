module.exports = {
  apps : [{
    name: 'RNS',
    script: 'index.js',
    instances: 4,
    watch: true,
    max_memory_restart: '10G',
    env: {
      NODE_ENV: 'local'
    },
    env_production: {
      NODE_ENV: 'development'
    }
  }]
};
