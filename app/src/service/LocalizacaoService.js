import Api from './api'

export default {
    async alterarLocal(payload) {
        try {
            const response = await Api().post('/alterarlocal', payload)
            return response.data
        } catch(err) {
            console.log(err)
        }
    }
}