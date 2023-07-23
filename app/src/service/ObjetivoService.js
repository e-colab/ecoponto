import Api from './api'

export default {
    async getObjetivo() {
        try {
            const response = await Api().get('/objetivos')
            console.log('data', response.data)
            return response.data
        } catch(err) {
            console.log(err)
        }
    },

    async postCategoria(payload) {
        try {
            const response = await Api().post('/cadastrar-objetivo', {
                descricao: payload.descricao
            })
            return response.data
        } catch(err) {
            console.log(err)
        }
    }
}