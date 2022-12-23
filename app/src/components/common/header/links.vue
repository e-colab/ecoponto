<template>
    <section class="links">
        <div class="links-container" v-for="link in links" :key="link" :class="{selected: selectedLink(link.path)}">
            <router-link :to="`/${link.path}`" class="links-router"><p class="links-router__text">{{link.title}}</p></router-link>
        </div>
    </section>
</template>

<script>
export default {
    name:"header-links",
    data(){
        return{
            links: [   {title: 'Buscar', icon: 'map-pin-point.svg', path: 'search'}, 
                        {title: 'Quem somos', icon: 'user-profile.svg', path: 'about'}, 
                        {title: 'Cadastre sua empresa', icon:'add.svg', path: 'register'}, 
                        {title:'Contato', icon:'email-symbol.svg', path: 'contact'} ]
        }
    },
    computed: {
        getPortal() {
            return this.$route.path.slice(1);
        },
    },
    methods:{
        selectedLink(path){
            return this.getPortal === path
        }
    }
}
</script>

<style lang="scss" scoped>
.links{
    height: 100%;
    display: flex;
    gap: 15px;

    &-container{
        display: flex;
        align-items: center;
        justify-content: center;

        transition: 0.5s;
        &:hover{
            transition: 0.5s;
            background-color: #064801;
        }
    }
    &-router{
        color: #f2f6f9;
        text-transform: uppercase;
        text-decoration: none;

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