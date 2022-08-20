module.exports = {
    apps: [{
        name: "TaktischeUhr",
        script: "tsnode",
        watch: ["src", "assets"],
        ignore_watch: ["cache", "public"],
        instances: 1,
        watch: true,
        restart_delay: 100,
        max_memory_restart: "2G"
    }]
}