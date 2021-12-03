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
      this.$modal.show(Dialog).then(async resp => {
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
            console.log(err)
            this.$alert('Erro ao enviar os dados para o servidor...')
          })
        } else {
          console.log(resp)
          this.$alert(resp.message)
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