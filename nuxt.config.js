export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'hackuva',
        htmlAttrs: {
            lang: 'de'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/assets/img/favicon.ico' }
        ],
        script: [
            { src: '/assets/js/jquery-1.9.1.min.js' },
            { src: '/assets/js/jquery-ui.js' },
            { src: '/assets/js/hackuva.js' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@static/assets/css/bootstrap.min.css',
        '@static/assets/css/style.css',
        '@static/assets/css/style_dark.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/sitemap',
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    generate: {
        dir: 'docs/',
        fallback: '404.html'
    },

    router: {
        trailingSlash: true
    },

    sitemap: {
        hostname: 'https://www.hackuva.de',
        gzip: true
    }


}