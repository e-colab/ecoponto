import Api from './api'

export default {
    async getCategorias() {
        try {
            const response = await Api().get('/categorias')
            return response.data
        } catch(err) {
            return err.response.status
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
            return err.response.status
        }
    }
}