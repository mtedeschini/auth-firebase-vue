<template>
    {{tarea}}
    <form @submit.prevent="updateTarea(tarea)">
      <Input :tarea="tarea"/>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Input from '../components/Input.vue'

export default {
    components: {
        Input,
    },
    computed: {
        ...mapState(['tarea']),
    },
    methods: {
        ...mapActions(['setTarea', 'updateTarea'])
    },
    created(){
        this.setTarea(this.$route.params.id);
    }

}
</script>
