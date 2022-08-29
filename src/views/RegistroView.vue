<template>
  <h1 class="my-2">Registro de Usuario</h1>  
  <form @submit.prevent="procesarFormulario()">
    <input 
        class="form-control my-2"
        type="email" 
        placeholder="Email"
        v-model.trim="email"
        :class="(error.tipo === 'existingMail' ||  error.tipo === 'invalidMail') && 'is-invalid'"
      >
        <div v-if="error.tipo === 'existingMail' || error.tipo === 'invalidMail' " class="text-right error" role="alert">
            {{error.mensaje}}
        </div>    
    <input 
        class="form-control my-2"
        type="password" 
        placeholder="Password"
        v-model.trim="password1"
    >      
    <input 
        class="form-control my-2"
        type="password" 
        placeholder="Repita Password"
        v-model.trim="password2"
        >
    <button 
        type="submit" 
        class="btn btn-success"
        :disabled="bloquear"
        >
        Registrar
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            email: '',
            password1: '',
            password2: ''
        }
    },
    computed:{
        ...mapState(['error']),
        bloquear(){
            if(this.email.includes('@') 
            && this.password1.length > 5 
            && this.password1=== this.password2) {
                return false
            }
            return true
        }
    },
    methods:{
        ...mapActions(['registrarLogUser']),
        async procesarFormulario(){
            await this.registrarLogUser({email: this.email, password: this.password1})
            //LIMPIAR FORMULARIO
            if(this.error.tipo){
                return
            }
            this.email = ""
            this.password1 = ""
            this.password2 = ""
        }
    }
}
</script>

<style>

</style>