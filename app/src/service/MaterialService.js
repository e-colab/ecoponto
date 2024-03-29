import Api from './api'

export default {
    async getMateriais(payload) {
        try {
            const response = await Api().post('/retrievematerial', payload)
            return response.data
        } catch(err) {
            return err.response.status
        }
    },

    async postMateriais(array) {
        try {
            const response = await Api().post('/material', { array })
            return response.data
        } catch(err) {
            return err.response.status
        }
    }
}