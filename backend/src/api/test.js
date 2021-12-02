module.exports = (app) => {
    // Método para teste da API
    const apistatus = (req, res) => {
        res.sendStatus(200)
    }

    return {
        apistatus
    }
}