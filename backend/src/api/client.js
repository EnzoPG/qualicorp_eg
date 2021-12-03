/**
 * Função para validação de e-mail (REGEX)
 * @param {string} email 
 * @returns {boolean}
 */
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = (app) => {
    /**
     * Método para buscar os clientes
     * @param {object} req 
     * @param {object} res 
     * @return {array<object>} {status: 1, mensagem: "sucesso", Clientes: []}
     */
    const getCli = async (req, res) => {
        await app.db.find()
            .then(clis => {
                if(clis.length > 0) {
                    res.send({
                        status: 1,
                        mensagem: "Sucesso!",
                        Clients: clis
                    })
                } else {
                    res.send({
                        status: 2,
                        mensagem: "Sem clientes cadatrados!"
                    })
                }
            })
            .catch(err => {
                res.send({
                    status: 0,
                    err: err,
                    mensagem: "Não foi possível consultar os clientes"
                })
            })
    }

    /**
     * Método para cadastrar clientes
     * @param {object} req 
     * @param {object} res 
     * @return {array<object>} {status: 1, mensagem: "sucesso"}
     */
    const createCli = async (req, res) => {
        // Descontrói o objeto body para armazenar as variáveis
        const {
            nome,
            idade,
            email,
            number,
            documento
        } = req.body
        // Valida o e-mail
        if (!validateEmail(email)) {
            return res.send({
                status: 2,
                mensagem: 'E-mail não é válido!'
            })
        }

        // Valida se os dados existem realmente
        if(Object.keys(req.body).length === 0 || !idade || !nome || !email || !number || !documento) {
            return res.send({
                status: 2,
                mensagem: 'Preencha todos os campos!'
            })
        }

        // Tratativas das informações
        var age = (typeof idade !== 'undefined') ?? parseInt(idade)
        // regex para pontuações
        var regex = /[^a-zA-Z0-9]/g
        // Adiciona tratativas para salvar o dado sem pontuações
        var num = (typeof number !== 'undefined') ?? number.replace(regex, "")
        var doc = (typeof documento !== 'undefined') ?? documento.replace(regex, "")

        try {
            // Construindo objeto completo com as informações a serem salvas
            var item = {
                nome: nome,
                idade: age,
                number: num,
                email: email,
                documento: doc
            }
            // Processo de salvar o novo item (cliente)
            var data = new app.db(item)
            await data.save()

            res.send({
                status: 1,
                mensagem: "Dados salvos!"
            })
        } catch (error) {
            res.send({
                status: 0,
                err: error,
                mensagem: "Ocorreu um erro ao salvar as informações!"
            })
        }
    }

    /**
     * Método para atualizar clientes
     * @param {object} req 
     * @param {object} res 
     * @return {array<object>} {status: 1, mensagem: "sucesso"}
     */
    const updateCli = (req, res) => {
        // Armazena a variável ID (QUERY)
        var ID = req.query.clientID
  
        app.db.findById(ID, async function(err, client) {
            if (err) {
               return res.send({
                   status: 0,
                   mensagem: "Cliente não encontrado!"
               })
            }
            // Descontrói o objeto body para armazenar as variáveis
            const {
                nome,
                email,
                idade,
                number,
                documento
            } = req.body
            // Valida o e-mail
            if (!validateEmail(email)) {
                return res.send({
                    status: 2,
                    mensagem: 'E-mail não é válido!'
                })
            }

            // Valida se os dados existem realmente
            if(Object.keys(req.body).length === 0 || !idade || !nome || !email || !number || !documento) {
                return res.send({
                    status: 2,
                    mensagem: 'Preencha todos os campos!'
                })
            }

            // Tratativas das informações
            var age = (typeof idade !== 'undefined') ?? parseInt(idade)
            // regex para pontuações
            var regex = /[^a-zA-Z0-9]/g
            // Adiciona tratativas para salvar o dado sem pontuações
            var num = (typeof number !== 'undefined') ?? number.replace(regex, "")
            var doc = (typeof documento !== 'undefined') ?? documento.replace(regex, "")

            // Seta os novos dados
            client.nome = nome
            client.email = email
            client.idade = age
            client.number = num
            client.documento = doc
            
            try {
                await client.save()

                res.send({
                    status: 1,
                    mensagem: "Dados atualizados!"
                })
            } catch (error) {
                res.send({
                    status: 0,
                    err: error,
                    mensagem: "Ocorreu um erro ao salvar as informações!"
                })
            }
        })
    }

    /**
     * Método para deletar clientes
     * @param {object} req 
     * @param {object} res 
     * @return {array<object>} {status: 1, mensagem: "sucesso"}
     */
    const deleteCli = (req, res) => {
        // Armazena a variável ID (QUERY)
        var ID = req.query.clientID

        if (!ID) return res.sendStatus(400)

        try {
            app.db.findByIdAndRemove(ID).exec()

            res.send({
                status: 1,
                mensagem: "Informações deletadas!"
            })
        } catch (error) {
            res.send({
                status: 0,
                err: error,
                mensagem: "Ocorreu um erro ao excluir as informações!"
            })
        }
    }

    return {
        getCli,
        createCli,
        updateCli,
        deleteCli
    }
}