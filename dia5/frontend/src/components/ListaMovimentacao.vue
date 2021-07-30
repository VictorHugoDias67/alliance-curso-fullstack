<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>Movimentações</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button v-on:click="$bvModal.show('modal-insert')">
                    <b-icon-plus></b-icon-plus>
                </b-button>
            </b-navbar-nav>
        </b-navbar>
        <FormMovimento ref="formAdicionar" :movimento="novoMovimento" title="Adicionar Usuario" :idModal="modal-insert"/>

        <b-table striped hover :items="movimentos"></b-table>
    </div>
</template>

<script>
import FormMovimento from './FormMovimento.vue'
import axios from 'axios'
export default {
    name: 'ListaMovimentacao',
    data: function(){
        return{
            movimentos: [],
            novoMovimento: {
                id: "",
                data_mov:"" ,
                descricao:"" ,
                categoria: "",
                valor:"" 
            },
            mostrarErro: false,
            errorMessage: {
                action: "",
                message: ""
            }
        }
    },
    props: {
        movimento: {
            id: Number,
            data_mov: String,
            descricao: String,
            categoria: String,
            valor: Number 
        },
        index: Number,
    },
    components: {
        FormMovimento
    },
    async created(){
        var response = await axios.get('http://localhost:3000/movimentos')
        this.movimentos = response.data
    }
}
</script>

<style scoped>
</style>