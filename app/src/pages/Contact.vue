<template>
    <page-wrapper>
        <section class="contact">
            <Title title="Contato"/>
            <p>Entre em contato através do e-mail: e-colab@ufscar.br</p>
        </section>
    </page-wrapper>
</template>

<script>
import PageWrapper from './PageWrapper.vue';
import Title from '../components/common/title.vue';

export default {
    name: 'ContactPage',
    components: {
        PageWrapper,
        Title
    }
}
</script>

<style lang="scss" scoped>
.contact{
    background-color: #fef4ea;
    min-height: 100vh;
    padding: 40px 80px;
}
</style>