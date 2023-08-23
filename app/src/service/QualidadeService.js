import Api from './api'

export default {
    async getQualidades() {
        try {
            const response = await Api().get('/qualidades')
            return response.data
        } catch(err) {
            return err.response.status
        }
    },

    async postCategoria(payload) {
        try {
            const response = await Api().post('/qualidades', {
                descricao: payload.descricao
            })
            return response.data
        } catch(err) {
            return err.response.status
        }
    }
}