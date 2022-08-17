module.exports = {
    apps: [{
        name: "TaktischeUhr",
        script: "ts-node ./src/app.ts",
        watch: true,
        max_memory_restart: "2G"
    }]
}