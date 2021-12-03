<template>
  <div class="md-layout">
    <div
      class="
        md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-90
        table
      "
    >
      <md-table
        v-model="people"
        md-card
        @md-selected="onSelect"
        md-sort="nome"
        md-sort-order="asc"
        v-if="people.length >= 1"
      >
        <md-table-toolbar>
          <h1 class="md-title">Lista de Clientes</h1>
        </md-table-toolbar>

        <md-table-toolbar
          slot="md-table-alternate-header"
          slot-scope="{ count }"
        >
          <div class="md-toolbar-section-start">
            {{ getAlternateLabel(count) }}
          </div>
          <div class="md-toolbar-section-end">
            <!-- EDIT -->
            <md-button
              class="md-icon-button"
              @click="editClient"
              v-if="selected.length <= 1"
            >
              <md-icon>edit</md-icon>
            </md-button>
            <!-- DELETE -->
            <md-button class="md-icon-button" @click="deleteClient">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-toolbar>

        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          md-selectable="multiple"
          md-auto-select
        >
          <md-table-cell md-label="Nome" md-sort-by="nome">{{
            item.nome
          }}</md-table-cell>
          <md-table-cell md-label="E-mail" md-sort-by="email">{{
            item.email
          }}</md-table-cell>
          <md-table-cell md-label="Idade" md-sort-by="idade">{{
            item.idade
          }}</md-table-cell>
          <md-table-cell md-label="Número (Tel / Cel)" md-sort-by="number">{{
            item.number
          }}</md-table-cell>
          <md-table-cell md-label="Documento" md-sort-by="documento">{{
            item.documento
          }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script src="../controllers/listController.js"></script>

<style scoped>
.md-table,
.md-table {
  margin-top: 16px;
}

.table {
  width: 100%;
  padding-left: 0%;
}

/* Mobile */
@media only screen and (max-width: 720px) {
  .table {
    width: 100%;
    padding: 35px;
    margin-bottom: 5%;
    padding-left: 15%;
  }
}
</style>