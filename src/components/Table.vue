<template>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Teconogías</th>
      <th scope="col">Categoría</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="tarea in tareas" :key="tarea.id">
      <td>{{tarea.id}}</td>
      <td>{{tarea.nombre}}</td>
      <td>{{tarea.tech.join(', ').toUpperCase()}}</td>
      <td>{{tarea.category}}</td>
      <td>{{tarea.cantidad}}</td>
      <td>
          <router-link 
             class="btn btn-warning btn-sm mx-1 my-1"
             :to="{ 
              name: 'editar', 
              params: {
                  id: tarea.id
              }
          }"
         >Editar</router-link>
          <button @click="deleteTarea(tarea.id)" class="btn btn-danger btn-sm mx-1 my-1">Eliminar</button>
      
      </td>
    </tr>
  </tbody>
</table>

</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "Tabla",
    computed: {
    ...mapState(['tareas']),
  },
  methods:{
      ...mapActions(['deleteTarea'])
  }
}
</script>

<style>
.btn{
  min-width: 70px;
  
}

</style>