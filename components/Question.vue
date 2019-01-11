<template lang="html">

    <div @click="show" class="box">
        <div class="acc-heading" :class="{'is-active':showing}">
            <span>
                <slot name="header" />
            </span>
        </div>
        <transition name="fade">
            <div v-show="showing">
                <p style="padding-top: 10px"> <slot /> </p>
            </div>
        </transition>
    </div>

</template>

<script>
export default {
    data() {
        return {
            showing: false,
        }
    },
    methods: {
        show(){
            this.showing = !this.showing
        }
    }
}
</script>

<style lang="css">
    .box {
        padding: 1em 1em;
        margin-bottom: .75em;
    }
</style>
