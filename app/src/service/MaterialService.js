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

    async postMateriais(array) {
        try {
            const response = await Api().post('/cadastrar-material', { array })
            return response.data
        } catch(err) {
            console.log(err)
        }
    }
}