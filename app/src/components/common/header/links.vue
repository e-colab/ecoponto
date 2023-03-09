<template>
    <section class="links">
        <div class="links-container" v-for="link in HEADER_LINK" :key="link" :class="{selected: selectedLink(link.path)}">
            <router-link :to="`/${link.path}`" class="links-router"><p class="links-router__text">{{link.title}}</p></router-link>
        </div>
    </section>
</template>

<script>
import { HEADER_LINK } from '../../../constants/links.js';

export default {
    name:"header-links",
    data(){
        return{
            HEADER_LINK
        }
    },
    computed: {
        getPortal() {
            return this.$route.path.slice(1);
        },
    },
    methods:{
        selectedLink(path){
            return this.getPortal === path || (this.getPortal === '' && path === 'search')
        }
    }
}
</script>

<style lang="scss" scoped>
.links{
    height: 100%;
    display: flex;
    gap: 15px;
    @media only screen and (max-width: 910px){
        flex-direction: column;
        width: 100%;
        gap: 0;
    }

    &-container{
        display: flex;
        align-items: center;
        justify-content: center;

        transition: 0.5s;
        &:hover{
            transition: 0.5s;
            background-color: #064801;
        }

        @media only screen and (max-width: 910px){
            width: 100%;
            padding: 7px 0;
        }
    }
    &-router{
        color: #f2f6f9;
        text-transform: uppercase;
        text-decoration: none;
        height: 100%;
        display: flex;
        align-items: center;

        &__text{
            margin: 0 12px 0 12px;
        }
    }
}

.selected{
    opacity: 70%;
    background-color: #064801;
}
</style>