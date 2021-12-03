import List from '../components/List.vue'
import Dialog from '../components/DialogCreateCli'
import environment from '../environments/environments'

export default {
  name: "App",
  components: {
    List
  },
  methods: {
    openModalToCreate() {
      this.$modal.show(Dialog, {
        title: 'Preencha todos os campos!',
        message: 'Nome'
      }).then(async resp => {
        if(parseInt(resp.status) === parseInt('1')) {
          await this.$axios.post(`${environment.development.baseURL}clients`, JSON.stringify(resp), {
            headers : {
              'Content-Type': 'application/json'
            }
          })
          .then(resp => {
            if(resp.data.status !== 1) {
              this.$alert(`${resp.data.mensagem}`)
            } else {
              this.$confirm(`${resp.data.mensagem}`).then(() => {
                window.location.reload()
              })
            }
          })
          .catch(err => {
            this.$alert(`${err}`)
          })
        } else {
          this.$alert('Ocorreu um problema ao processar a requisição...')
        }
      })
      .catch(err => {
        if(err.status === 0) {
          console.log('Modal fechado!');
        } else {
          console.log('Motivo desconhecido!');
        }
      })
    }
  }
}