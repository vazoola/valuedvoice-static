module.exports = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
  head: {
        title: 'ValuedVoice',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Valued Voice is the go-to Platform for influencers that want to receive Paid Opportunities.' },
			{ hid: 'keywords', name:'keywords', content: 'Influencer jobs, influencer opportunities, social jobs, blog revenue' },
			{ hid: 'twitter:card', name:'twitter:card', content: "summary_large_image" },
			{ hid: 'twitter:site', name:'twitter:site', content: "@valuedvoicelv" },
			{ hid: 'twitter:creator', name:'twitter:creator', content: "@valuedvoicelv" },
			{ hid: 'twitter:image', name:'twitter:image', content: '/images/logo.svg' },
			{ hid: 'og:image', name:'og:image', content: '/images/logo.svg' },
			{ hid: 'og:title', name:'og:title', content: "ValuedVoice | Go-to Platform for influencers" },
			{ hid: 'og:description', name:'og:description', content: 'Valued Voice is the go-to Platform for influencers that want to receive Paid Opportunities.'  },
			{ hid: 'og:site_name', name:'og:site_name', content: 'ValuedVoice' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },

	/*
  ** Global CSS
  */
	css: ['@/assets/style/main.scss'],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [],

	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		//'@nuxtjs/axios'
		// Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
		//'@nuxtjs/bulma'
	],
	/*
  ** Axios module configuration
  */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},
	generate: {
        routes: function() {
            var Prismic = require("prismic-javascript");
            return Prismic.getApi("https://valuedvoice.cdn.prismic.io/api/v2")
                .then(function(api) {
                    return api.query([
                            Prismic.Predicates.at('document.type', 'blog_posts')
                        ]).then(function(response) {
                            return routes = response.results.map((r) => {
                                    return {
                                        route: '/blog/'+r.uid,
                                        payload: r
                                    };
                            });
                    });
                });
        }
    },
	/*
  ** Build configuration
  */
	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false
				}
			}
		},
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}
}
