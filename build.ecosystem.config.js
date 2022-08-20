module.exports = {
    apps: [{
        name: "TU-Build",
        script: "./dist/app.js",
        instances: 1,
        watch: false,
        restart_delay: 5000,
        max_memory_restart: "2G"
    }]
}