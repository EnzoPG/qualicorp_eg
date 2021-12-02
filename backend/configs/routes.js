module.exports = (app) => {
  // Rota de teste
  app.get("/", app.api.test.apistatus)

  // Rota para usuários
  app.route('/clients')
    .get(app.api.client.getCli)
    .post(app.api.client.createCli)
    .patch(app.api.client.updateCli)
    .delete(app.api.client.deleteCli)
}