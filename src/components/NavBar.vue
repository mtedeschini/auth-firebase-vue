<template>
    <div class="navbar navbar-dark bg-dark">
        <router-link to='/' class="navbar-brand">Formularios</router-link>
        <div class="d-flex" v-if="usuarioAutenticado">
            <button class="btn btn-dark" >Bienvenido {{logUser.email}}</button>
            <button @click="cerrarSesion" class="btn btn-dark" >Cerrar Sesión</button>
        </div>
        <div class="d-flex" v-else>
            <router-link class="btn btn-dark" to="/registro">Registro</router-link>
            <router-link class="btn btn-dark" to="/ingreso">Ingreso</router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
computed: {
    ...mapState(['logUser']),
    ...mapGetters(['usuarioAutenticado']),
},
methods:{
    ...mapActions(['cerrarSesion'])
}
}
</script>
