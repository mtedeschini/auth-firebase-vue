<template>
  <h1 class="my-2">Ingreso de Usuario</h1>
  <form @submit.prevent="procesarFormulario()">
      <input 
      type="email" 
      class="form-control my-2" 
      placeholder="Email"
      v-model.trim="email"
      :class="error.tipo==='email' && 'is-invalid'"
      >

    <div v-if="error.tipo === 'email'" class="text-right error" role="alert">
        {{error.mensaje}}
    </div>

      <input 
      type="password" 
      class="form-control my-2" 
      placeholder="Password"
      v-model.trim="password"
      :class="error.tipo==='password' && 'is-invalid'">

    <div v-if="error.tipo === 'password'" class="text-right error" role="alert">
        {{error.mensaje}}
    </div>

      <button 
      class="btn btn-success"
      :disabled="verificar"
      >Ingresar</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
data() {
    return {
        email: 'matias.tedeschini@globant.com',
        password: '123123'
    }
},
methods:{
    ...mapActions(['ingresoUser']),
    procesarFormulario(){
        this.ingresoUser({email: this.email, password: this.password})
        //NO BORRA LOS DATOS DE LOS INPUT SI HAY ERROR
        if(this.error.tipo){
            return
        }
        //BORRA LOS DATOS DEL INPUT
        this.email = ""
        this.password = ""
    }
},
computed: {
    ...mapState(['error']),
    verificar(){
        if(this.email && this.password && this.email.includes('@')){
            return false
        } 
        return true
    },

},
}
</script>

<style>

.error{
    color: rgb(200, 0, 0);
    font-weight: 500;
    font-size: 13px;
}
</style>