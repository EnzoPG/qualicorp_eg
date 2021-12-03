import environment from '../environments/environments'

export default () => {
    // Objeto options
    var options = {}
    // Define os parâmetros necessários para a instância
    options.timeout = 10000
    options.baseURL = environment.development.baseURL
    // Cria e retorna a instância
    const instance = this.$axios.create(options)
    return instance
}