<template lang="html">
    <div class="container-fluid mt-4 mb-3">
        <section class="hero is-dark has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Blog Page</h1>
                    <h2 class="subtitle">
                        Blog subtitle goes here.
                    </h2>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="columns is-multiline">
                    <div v-for="r in resources" :key="r.id" class="column is-one-third">
                        <a :href="'/blog/'+r.uid">
                            <div class="card">
                                <div class="card-image">
                                    <figure v-if="r.data.cover_image" class="image is-4by3">
                                        <img style="object-fit: cover" :src="r.data.cover_image.url" :alt="r.data.short_title">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <p class="title is-4">{{ r.data.short_title }}</p>
                                    <div class="content">
                                        <p>{{ r.data.summary }}</p>
                                        <br>
                                        <time datetime="2016-1-1">
                                            <small>{{ new Date(r.data.publish_date).toDateString() }}</small>
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    async asyncData({ params }) {
        var Prismic = require("prismic-javascript");

        return Prismic.getApi("https://valuedvoice.cdn.prismic.io/api/v2")
            .then(function(api) {
                return api.query(
                    Prismic.Predicates.at('document.type', 'blog_posts'),
                    { orderings : "[my.blog_posts.publish_date desc]"},
                ).then(function(response) {
                    return {
                        resources: response.results,
                    };
                });
            })
    },
}
</script>

<style lang="css">
</style>
