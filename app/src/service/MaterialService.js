import Api from './api'

export default {
    async getMateriais() {
        try {
            const response = await Api().get('/materiais')
            return response.data
        } catch(err) {
            console.log(err)
        }
    },

    async postMateriais(nome, qualidade, unidade, categoria, cnpj, objetivo, quantidade, medidaCadastrada) {
        try {
            const response = await Api().post('/cadastrar-material', {
                nome: nome,
                qualidade: qualidade,
                unidade: unidade,
                categoria: categoria,
                cnpj: cnpj,
                objetivo: objetivo,
                quantidade: quantidade,
                medidaCadastrada: medidaCadastrada
            })
            return response.data
        } catch(err) {
            console.log(err)
        }
    }
}