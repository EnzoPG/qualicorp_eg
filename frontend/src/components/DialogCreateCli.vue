<template>
  <div>
    <md-modal-dialog>
      <md-dialog-title>
        {{ title }}
      </md-dialog-title>

      <md-dialog-content>
        <!-- Nome -->
        <md-field>
          <label>Nome: </label>
          <md-input type="text" v-model="nome" name="nome" />
        </md-field>

        <!-- E-mail -->
        <md-field>
          <label>E-mail: </label>
          <md-input type="email" v-model="email" nome="email" />
        </md-field>

        <!-- Idade -->
        <md-field>
          <label>Idade: </label>
          <md-input type="number" v-model="idade" nome="idade" />
        </md-field>

        <!-- Telefone / Celular -->
        <md-field>
          <label>Telefone / Celular: </label>
          <md-input type="text" v-model="number" nome="number" />
        </md-field>

        <!-- Documento -->
        <md-field>
          <label>Documento (RG / CPF): </label>
          <md-input type="text" v-model="documento" nome="documento" />
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="getFormValues">Enviar</md-button>
        <md-button @click="$modal.cancel({ status: 0 })">Cancelar</md-button>
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    title: String,
    message: String,
  },
  data: () => ({
    nome: "",
    email: "",
    idade: "",
    number: "",
    formData: {},
    documento: "",
    showDialog: false,
  }),
  methods: {
    getFormValues() {
      // Validando o input
      if(!this.nome || !this.email || !this.idade || !this.number || !this.documento) {
        // Retorna o alerta
        return this.$modal.submit({status: 0})
      }

      this.formData = {
        status: 1,
        nome: this.nome,
        email: this.email,
        idade: this.idade,
        number: this.number,
        documento: this.documento
      }

      return this.$modal.submit(this.formData)
    },
  },
};
</script>

<style>
</style>