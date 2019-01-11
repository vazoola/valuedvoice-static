<template lang="html">
    <div class="container-fluid mt-4 mb-3">

        <section class="hero is-dark has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{ post.title }}</h1>
                    <h2 class="subtitle">{{ post.publish_date }}</h2>
                    <div class="post-image">
                        <figure class="image">
                    <img :src="post.cover_image.url" :alt="post.title">
                </figure>
                    </div>
                    <div class="addthis_inline_share_toolbox"></div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column post-content">
                        <div class="content" v-html="post.html" />
                    </div>
                </div>
            </div>
        </section>

        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c06ba30687d16d2"></script>
    </div>
</template>

<script>
export default {
    async asyncData({ params, error, payload }) {
        //preps post data
        var compilePost = function(post) {
            var PrismicDOM = require('prismic-dom');
            //format the post content to html
            post.html = PrismicDOM.RichText.asHtml(post.content, function(doc) {
                return "/blog/" + doc.uid;
            })
            //format the title to plan text for now
            post.title = PrismicDOM.RichText.asText(post.title)
            //format the date
            post.publish_date = new Date(post.publish_date).toDateString()

            return { post: post};
        }

        //if on live
        if(payload) {
            return compilePost(payload.data);
        } else {
            //query for dev
            var Prismic = require("prismic-javascript");
            return Prismic.getApi("https://valuedvoice.cdn.prismic.io/api/v2")
                .then(function(api) {
                    return api.query(
                        Prismic.Predicates.at('my.blog_posts.uid', params.slug)
                    ).then(function(response) {
                        return compilePost(response.results[0].data);
                    });
                });
        }
    },

    head () {
        return {
            title: "ValuedVoice Blog | "+this.post.title,

            meta: [
                { hid: 'description', name: 'description', content: this.post.summary },
                { hid: 'keywords', name:'keywords', content: this.post.keywords },
                { hid: 'twitter:description', name:'twitter:description', content: this.post.summary },
                { hid: 'twitter:image', name:'og:image', content: this.post.cover_image.url },
                { hid: 'og:title', name:'og:title', content: this.post.title },
                { hid: 'og:url', name:'og:url', content: 'https://valuedvoice.com'+this.$route.path },
                { hid: 'og:image', name:'og:image', content: this.post.cover_image.url },
                { hid: 'og:description', name:'og:description', content: this.post.summary },
            ]
        }
    },
}
</script>

<style lang="css">
</style>
