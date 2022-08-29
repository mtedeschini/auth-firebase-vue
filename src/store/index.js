import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    logUser: null,
    tareas: [],
    tarea:{
      id: '',
      nombre: '',
      tech: [],
      category: '',
      cantidad: 0,
    },
    error: {tipo: "", mensaje:""},
  },
  getters: {
    usuarioAutenticado(state){
      //CUANDO ESTOY LOGUEADO, ME DEVUELVE TRUE
      //IGUAL QUE return state.logUser ? true : false
      return !!state.logUser
    }
  },
  mutations: {
    setLogUser(state, payload){
      state.logUser = payload
    },    
    set(state, payload){
      state.tareas.push(payload)
      //localStorage.setItem('tarea', JSON.stringify(state.tareas))
    },
    eliminar(state, payload){
      //TAREAS VAN A SER TODOS MENOS EL ID QUE ENVIAMOS
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload){
      //BUSCA EL USER EL PAYLOAD.ID
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return 
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      //localStorage.setItem('tarea', JSON.stringify(state.tareas))
      router.push('/')
    },
    cargar(state, payload){
      state.tareas = payload
    },
    setError(state, payload){
      if(payload.message === "EMAIL_NOT_FOUND"){
        return state.error = {tipo: "email", mensaje: "Correo Incorrecto"}
      }else if(payload.message === "INVALID_PASSWORD"){
        return state.error = {tipo: "password", mensaje: "Contraseña Incorrecta"}
      }else if(payload.message === "INVALID_EMAIL"){
        return state.error = {tipo: "invalidMail", mensaje: "Correo no válido"}
      }else if(payload.message === "EMAIL_EXISTS"){
        return state.error = {tipo: "existingMail", mensaje: "El correo ya se encuentra en uso"}
      }else{
        state.error = payload
      }    
    }
  },
  actions: {
    cerrarSesion({commit}){
      commit('setLogUser', null)
      router.push('/ingreso')
      //ELIMINO DATOS DEL LOCAL STORAGE
      localStorage.removeItem('user')

    },
    async registrarLogUser({commit}, usuario){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAajy7Eap5yzEjQAGx0-_GXoGN-3psSbi0',{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            //TOKEN PARA HACER CRUD, LO VALIDA BACKEND
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if(userDB.error){
          commit('setError', userDB.error)
          return
        }
        commit('setError', {tipo: "", mensaje:""})
        commit('setLogUser', userDB)
        router.push('/')
        //GUARDO DATOS EN LOCALSTORAGE
        localStorage.setItem('user', JSON.stringify(userDB))

      } catch (error) {
        console.log(error)
      }
    },
    async ingresoUser({commit}, usuario){
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAajy7Eap5yzEjQAGx0-_GXoGN-3psSbi0',{
          method: 'POST', 
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          }
          ),
        })
        const userDB = await res.json();
        if(userDB.error){
          console.log(userDB.error)
          return commit('setError', userDB.error)
        }
        commit('setLogUser', userDB)
        commit('setError', {tipo: "", mensaje:""})
        router.push('/')
        //GUARDO DATOS EN LOCALSTORAGE
        localStorage.setItem('user', JSON.stringify(userDB))

      } catch (error) {
        console.log(error)
      }
    },
    async getTareas({commit, state}){
      //SI ESTÁ EL USER EN LOCAL STORAGE, QUE LO SETEE COMO USUARIO ACTIVO
      if(localStorage.getItem('user')){
        commit('setLogUser', JSON.parse(localStorage.getItem('user')))
      }else{
        //SI NO ESTÁ SETEADO, QUE NO BUSQUE EN LA BASE DE DATOS LA INFO
        return commit('setLogUser', null)
      }
      try{
        const res = await fetch(`https://test-api-udemy-default-rtdb.firebaseio.com/tareas/${state.logUser.localId}.json?auth=${state.logUser.idToken}`)
        const dataDB = await res.json();
        const arrayTareas = []
        for(let id in dataDB){
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)
      }catch(error){
        console.log(error)
      }
    },
    async setTareas({ commit, state }, tarea){
      try{
        const res = await fetch(`https://test-api-udemy-default-rtdb.firebaseio.com/tareas/${state.logUser.localId}/${tarea.id}.json?auth=${state.logUser.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
      }catch (error){
        console.log(error)
      }
      commit('set', tarea)
    },
    async deleteTarea({commit, state}, id){
      try{
        await fetch(`https://test-api-udemy-default-rtdb.firebaseio.com/tareas/${state.logUser.localId}/${id}.json?auth=${state.logUser.idToken}`, {
          method: 'DELETE'
        })
        commit('eliminar', id)
      }catch(error){
        console.log(error)
      }
    },
    setTarea({ commit }, id){
      commit ('tarea', id )
    },
    async updateTarea({ commit, state }, tarea){
      try{
        const res = await fetch(`https://test-api-udemy-default-rtdb.firebaseio.com/tareas/${state.logUser.localId}/${tarea.id}.json?auth=${state.logUser.idToken}`, {
          method:'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json();
        commit ('update', tarea)
       }catch(error){
        console.log(error)
      }
    }
  },
  modules: {
  }
})
