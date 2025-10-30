
module.exports = {
  apps: [
    {
      name: 'tasks-api-prod',
      script: 'src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'tasks-api-dev',
      script: 'npx',
      args: 'nodemon src/index.js',
      watch: ['src'],
      ignore_watch: ['node_modules', 'tasks.json'],
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
