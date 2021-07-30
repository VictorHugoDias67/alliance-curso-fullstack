<template>
    <b-modal :id="idModal ? idModal : ('modal-confirm-edit'+movimento.id)" :title="title" v-on:ok="ok()">
        <b-form>
            <b-form-group
            id="input-data"
            label="Data"
            label-for="data"
            description="Informe a data"
            ></b-form-group>
            <b-form-input
            v-model="movimentoEditado.data_mov"
            type="date"
            required
            ></b-form-input>
            <br>
            <b-form-group
            id="input-descricao"
            label="Descrição"
            label-for="descricao"
            description="Descreva"
            ></b-form-group>
            <b-form-input
            v-model="movimentoEditado.descricao"
            type="text"
            required
            ></b-form-input>
            <br>
            <b-form-group
            id="input-categoria"
            label="Categoria"
            label-for="categoria"
            description="Escolha a categoria"
            ></b-form-group>
            <b-form-select v-model="movimentoEditado.categoria" :options="options"></b-form-select>
            <br>
            <b-form-group
            id="input-valor"
            label="Valor"
            label-for="valor"
            description="Informe o valor"
            ></b-form-group>
            <b-form-input
            v-model="movimentoEditado.valor"
            type="number"
            required
            ></b-form-input>
        </b-form>
    </b-modal>
</template>

<script>
export default {
    name: "FormMovimento",
    data: function(){
        return{
            movimentoEditado: {
                data_mov: "",
                descricao: "",
                categoria: "",
                valor: "" 
            },
            options: [
                { value: 'Esporte', text: 'Esporte' },
                { value: 'Lazer', text: 'Lazer'},
                { value: 'Jogos', text: 'Jogos'},
                { value: 'Contas', text: 'Contas'},
                { value: 'Alimentação', text: 'Alimentação'},
                { value: 'Vestuário', text: 'Vestuário'}
            ]
        }
    },
    props:{
        title: String,
        idModal: String,
        movimento: {
            id: Number,
            data_mov: String,
            descricao: String,
            categoria: String,
            valor: Number 
        }
    },
    methods: {
        ok: function(){
            this.$emit('confirmed', this.movimentoEditado)
        },
        reset(){
            this.movimentoEditado.data_mov = this.movimento.data_mov
            this.movimentoEditado.descricao = this.movimento.descricao
            this.movimentoEditado.categoria = this.movimento.categoria
            this.movimentoEditado.valor = this.movimento.valor
        }
    }
}
</script>

<style>
</style>