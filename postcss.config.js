module.exports = {
    plugins: [
        require("autoprefixer")({
            browsers: ["last 2 versions"]
        }),
        require("postcss-initial")({
            reset: "inherited" // reset only inherited rules
        }),
        require("cssnano")({
            preset: "default"
        })
    ]
}
