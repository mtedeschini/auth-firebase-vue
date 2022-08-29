<template>
    <form @submit.prevent="procesarForm" >
      <Input :tarea="this.tarea"/>
    </form>
    <p> 
      {
      <br>      
      nombre: {{tarea.nombre}}
      <br>      
      tech: {{tarea.tech}}
      <br>      
      category: {{tarea.category}}
      <br>      
      cantidad: {{tarea.cantidad}}
      <br>
      }
    </p>
    <Table/>
</template>
<script>

import Input from '../components/Input.vue'
import Table from '../components/Table.vue'
import { mapActions, mapState } from 'vuex'

//PAQUETE PARA GENERAR ID
const shortid = require('shortid');

export default {
  name: 'HomeView',
  data() {
    return {
      tarea:{
        id: '',
        nombre: '',
        tech: [],
        category: '',
        cantidad: 0,
      },
    }
  },
  components: {
    Input,
    Table,
  },  
  actions: {
    setTareas({ commit }, tarea){
      commit('set', tarea)
    },
    deleteTarea({commit}, tarea){
      commit('eliminar', id)
    }
  },
  methods:{
    ...mapActions(['setTareas', 'getTareas']),
    procesarForm(){
      if(this.tarea.nombre.trim() ===""){
        console.log("Campo Vacío")
        return
      }else{

      //GENERADOR DE ID
      this.tarea.id = shortid.generate();
      this.setTareas(this.tarea)

      //LIMPIAR FORMULARIO
      this.tarea = {
        id: '',
        nombre: '',
        tech: [],
        category: '',
        cantidad: 0,
      }
      }
    },
  },
   created(){
    this.getTareas()
  }

}
</script>
