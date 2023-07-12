import Api from './api'

export default {
    async getCategorias() {
        try {
            const response = await Api().get('/categorias')
            console.log('data', response.data)
            return response.data
        } catch(err) {
            console.log(err)
        }
    },

    async postCategoria(payload) {
        try {
            const response = await Api().post('/cadastrar-categoria', {
                nomeCategoria: payload.nomeCategoria,
                descricao: payload.descricao
            })
            return response.data
        } catch(err) {
            console.log(err)
        }
    }
}