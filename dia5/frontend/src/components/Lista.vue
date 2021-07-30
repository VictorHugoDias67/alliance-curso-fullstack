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
        <b-alert v-model="mostrarErro" variant="danger" dismissible>
            Falha ao {{errorMessage.action}} - {{errorMessage.message}}
        </b-alert>
        <FormMovimento ref="formAdicionar" :movimento="novoMovimento" title="Adicionar Usuario" v-on:confirmed="adicionarMovimento" idModal="modal-insert"/>
        <b-table
            :items="movimentos"
            :select-mode="single"
            responsive="sm"
            ref="selectableTable"
            selectable
            @row-selected="onRowSelected"  
            hover
        ></b-table>
        <Movimento v-if="selected.length > 0" :index="index" :movimento="movimentos" v-on:removed="removerMovimento(index,selected[0])"/>
    </div>
</template>

<script>
import Movimento from './Movimento.vue'
import FormMovimento from './FormMovimento.vue'
import axios from 'axios'
export default {
    name: 'ListaUsuarios',
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
            },
            selected: []
        }
    },
    components: {
        FormMovimento,
        Movimento
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
    methods:{
        onRowSelected(itens) {
            this.selected = itens
        },
        removerMovimento: async function(x, movimento){
            this.movimentos.splice(x, 1)
            await axios.delete(`http://localhost:3000/movimentos/${movimento.id}`)
        },
        adicionarMovimento: async function(novoMovimento){
            try{
                var result = await axios.post('http://localhost:3000/movimentos', novoMovimento)
                this.movimentos.push(result.data)
            }
            catch(error){
                this.mostrarErro = true;
                this.errorMessage.action = "inserir";
                this.errorMessage.message = error.responsestatusText
            }
            this.$refs.formAdicionar.reset();
        },
    },
    async created() {
      var response = await axios.get('http://localhost:3000/movimentos')
      this.movimentos = response.data
    }
}
</script>

<style scoped>
</style>