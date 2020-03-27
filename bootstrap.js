require("@babel/register")({
    ignore: [/node_modules/],
    presets: [
        ["@babel/preset-env"]
    ],
    plugins: [
        ["@babel/plugin-syntax-dynamic-import"], 
        ["@babel/plugin-transform-classes"],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ]
})

require("./server")