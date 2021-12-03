<template>
  <div>
    <md-modal-dialog v-slot="{ client }">
      <md-dialog-title>
        Identificação do Cliente: {{ client._id }}
      </md-dialog-title>

      <md-dialog-content>
        <!-- Nome -->
        <md-field>
          <label>Nome: </label>
          <md-input type="text" v-model="client.nome" name="nome" />
        </md-field>

        <!-- E-mail -->
        <md-field>
          <label>E-mail: </label>
          <md-input type="email" v-model="client.email" name="email" />
        </md-field>

        <!-- Idade -->
        <md-field>
          <label>Idade: </label>
          <md-input
            type="number"
            v-model="client.idade"
            name="idade"
            v-mask="'###'"
          />
        </md-field>

        <!-- Telefone / Celular -->
        <md-field>
          <label>Telefone / Celular: </label>
          <md-input
            type="text"
            v-model="client.number"
            name="number"
            v-mask="['(##) ####-####', '(##) #####-####']"
          />
        </md-field>

        <!-- Documento -->
        <md-field>
          <label>Documento (CPF / CNPJ): </label>
          <md-input
            type="text"
            v-model="client.documento"
            name="documento"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
          />
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="getFormValues(client)">Enviar</md-button>
        <md-button @click="$modal.cancel({ status: 0 })">Cancelar</md-button>
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogUp",
  props: {
    client: Object,
  },
  methods: {
    getFormValues(clientData) {
      // Validando os inputs
      if (
        !clientData.nome ||
        !clientData.email ||
        !clientData.idade ||
        !clientData.number ||
        !clientData.documento
      ) {
        // Retorna o alerta
        return this.$modal.submit({ status: 0 })
      }

      var formData = {
        status: 1,
        nome: clientData.nome,
        email: clientData.email,
        idade: clientData.idade,
        number: clientData.number,
        documento: clientData.documento,
      };

      return this.$modal.submit(formData)
    },
  },
};
</script>

<style>
</style>