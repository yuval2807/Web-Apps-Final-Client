module.exports = {
  apps : [{
    name   : "app1",
    script : "sudo node ./dist/app.js",
    env_production : {
        NODE_ENV: "production"
    }
  }]
}
