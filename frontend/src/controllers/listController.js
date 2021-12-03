import environments from "../environments/environments";

export default {
    name: "List",
    data: () => ({
        people: [],
        selected: [],
        message: "",
        paginatedUsers: [],
    }),
    methods: {
        async fetchData() {
            await this.$axios.get(`${environments.development.baseURL}clients`)
                .then((res) => {
                    this.people = res.data.Clients
                    this.message = res.data.mensagem
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
    },
    mounted() {
        this.fetchData()
    },
}