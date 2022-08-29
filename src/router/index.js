import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import RegistroView from '../views/RegistroView.vue'
import IngresoView from '../views/IngresoView.vue'
import store from '../store'

const routes = [
  {
    path:'/registro',
    name: 'Registro',
    component: RegistroView
  },  
  {
    path:'/ingreso',
    name: 'Ingreso',
    component: IngresoView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      rutaProtegida: true
    }
  },  
  {
    path: '/edit/:id',
    name: 'editar',
    component: EditView,
    meta: {
      rutaProtegida: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //RUTAS PROTEGIDAS
  if(to.meta.rutaProtegida){
      //ESTOY LOGUEADO?
    if(store.getters.usuarioAutenticado){
      next()
      //NO ESTOY LOGUEADO
    }else{
      next('/ingreso')
    }
  }else{
    //NO ESTÁ PROTEGIDA
    next()
  }
})

export default router
