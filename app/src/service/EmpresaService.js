import Api from './api'

export default {
    async getEmpresa(payload) {
        try {
            const response = await Api().post('/empresa', {
                cnpj: payload.cnpj
            })
            return response.data
        } catch(err) {
            return err.response.status
        }
    },

    async postEmpresas(payload) {
        try {
            const cadastro = await Api().post('/empresas', {
                cnpj: payload.cnpj,
                nome: payload.nome,
                email: payload.email,
                telefone: payload.telefone,
                funcResponsavel: payload.funcResponsavel,
                cep: payload.cep,
                cidade: payload.cidade,
                estado: payload.estado,
                endereco: payload.endereco,
                bairro: payload.bairro,
                numeroEndereco: payload.numeroEndereco
            })

            return cadastro.status
        } catch(err) {
            return err.response.status
        }
    }
}