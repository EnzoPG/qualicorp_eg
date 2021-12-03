import DialogUp from '../components/DialogUpdateCli'
import environment from "../environments/environments"

export default {
  name: "List",
  data: () => ({
    people: [],
    selected: [],
    message: "",
    emptyState: false,
    paginatedUsers: [],
  }),
  methods: {
    async fetchData() {
      await this.$axios.get(`${environment.development.baseURL}clients`)
        .then((res) => {
          if(res.data.status === 1) {
            this.people = res.data.Clients
            this.message = res.data.mensagem
          } else {
            this.emptyState = true
            this.message = res.data.mensagem
          }
        })
        .catch((err) => {
          console.log(err)
          this.people = []
          this.message = err
        });
    },
    onSelect(items) {
      this.selected = items
    },
    getAlternateLabel(count) {
      let plural = ""

      if (count > 1) plural = "s"

      return `${count} cliente${plural} selecionado${plural}`
    },
    checkSizeSelected() {
      return this.selected.length
    },
    editClient() {
      if (!this.selected) {
        // Caso de erro
        this.$alert('Selecione um registro válido!')
      } else {
        this.$modal.show(DialogUp, {
          client: this.selected[0]
        }).then(async resp => {
          if (parseInt(resp.status) === parseInt('1')) {
            await this.$axios.patch(`${environment.development.baseURL}clients?clientID=${this.selected[0]._id}`, JSON.stringify(resp), {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(resp => {
              if (resp.data.status !== 1) {
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
            console.log(err)
            // Caso de erro
            this.$alert('Erro ao processar informações!')
          })
      }
    },
    deleteClient(id) {
      if (id) {
        this.$confirm('Deseja realmente excluir este registro?').then(async () => {
          await this.$axios.delete(`${environment.development.baseURL}clients?clientID=${id}`)
            .then(resp => {
              if (resp.data.status !== 1) {
                // Caso de erro
                this.$alert(`${resp.data.mensagem}`)
              } else {
                // Caso de sucesso
                this.$alert(`${resp.data.mensagem}`)
                window.location.reload()
              }
            })
            .catch(err => {
              console.log(err)
              this.$alert('Erro ao enviar os dados para o servidor...')
            })
        })
      } else {
        console.log(id)
        this.$alert('Selecionar um registro válido!')
      }
    }
  },
  mounted() {
    this.fetchData()
  },
}