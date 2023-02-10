import Api from './api'

export default {
    async getEmpresas() {
        try {
            const response = await Api().get('/empresas')
            return response.data
        } catch(err) {
            console.log(err)
        }
    },

    // async postEmpresas(cnpj, nome, email, telefone, funcResponsavel, cep, cidade, estado, endereco, bairro, numeroEndereco) {
    async postEmpresas(payload) {
        try {
            await Api().post('/cadastrar-empresa', {
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
            }).then(function(response) {
                return response.sendStatus(200)
            })
        } catch(err) {
            console.log(err)
        }
    }
}