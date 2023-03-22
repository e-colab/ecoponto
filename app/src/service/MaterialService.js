import Api from './api'

export default {
    async getMateriais(payload) {
        try {
            const response = await Api().post('/material', payload)
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