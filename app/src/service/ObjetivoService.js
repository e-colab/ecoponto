import Api from './api'

export default {
    async getObjetivos() {
        try {
            const response = await Api().get('/objetivos')
            return response.data
        } catch(err) {
            return err.response.status
        }
    },

    async postCategoria(payload) {
        try {
            const response = await Api().post('/cadastrar-objetivo', {
                descricao: payload.descricao
            })
            return response.data
        } catch(err) {
            return err.response.status
        }
    }
}