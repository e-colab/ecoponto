import Api from './api'

export default {
    async getQualidades() {
        try {
            const response = await Api().get('/qualidades')
            console.log('data', response.data)
            return response.data
        } catch(err) {
            console.log(err)
        }
    },

    async postCategoria(payload) {
        try {
            const response = await Api().post('/cadastrar-qualidade', {
                descricao: payload.descricao
            })
            return response.data
        } catch(err) {
            console.log(err)
        }
    }
}