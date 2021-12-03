<template>
  <div>
    <md-modal-dialog>
      <md-dialog-title> Cadastrar Cliente </md-dialog-title>

      <md-dialog-content>
        <!-- Nome -->
        <md-field>
          <label>Nome: </label>
          <md-input type="text" v-model="nome" name="nome" />
        </md-field>

        <!-- E-mail -->
        <md-field>
          <label>E-mail: </label>
          <md-input type="email" v-model="email" name="email" />
        </md-field>

        <!-- Idade -->
        <md-field>
          <label>Idade: </label>
          <md-input type="number" v-model="idade" name="idade" v-mask="['##', '###']" />
        </md-field>

        <!-- Telefone / Celular -->
        <md-field>
          <label>Telefone / Celular: </label>
          <md-input
            type="text"
            v-model="number"
            name="number"
            v-mask="['(##) ####-####', '(##) #####-####']"
          />
        </md-field>

        <!-- Documento -->
        <md-field>
          <label>Documento (CPF / CNPJ): </label>
          <md-input
            type="text"
            v-model="documento"
            name="documento"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
          />
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="getFormValues">Enviar</md-button>
        <md-button @click="$modal.cancel({ 
          status: 0,
          message: 'Operação não executada!'
        })">Cancelar</md-button>
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
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
      // Validando os inputs
      if (
        (!this.nome ||
        !this.email ||
        !this.idade ||
        !this.number ||
        this.number.length < 14 ||
        !this.documento) ||
        (this.documento.length != 14 && this.documento.length != 18)
      ) {
        console.log({
          client: {
            nome: this.nome,
            email: this.email,
            idade: this.idade,
            number: this.number,
            documento: this.documento,
            validation1: this.number.length < 14,
            validation2: this.documento.length != 14,
            validation3: this.documento.length != 18
          }
        });
        // Retorna o alerta
        return this.$modal.submit({ 
          status: 0,
          message: 'Dados não preenchidos da forma correta!'
        });
      }

      this.formData = {
        status: 1,
        nome: this.nome,
        email: this.email,
        idade: this.idade,
        number: this.number,
        documento: this.documento,
      };

      return this.$modal.submit(this.formData);
    },
  },
};
</script>

<style>
</style>