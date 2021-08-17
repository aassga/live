import Vue from 'vue'
import Vuex from 'vuex'
import { getSiteConfig } from "@/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pictureDomain: 'http://klk.9161252.com/' //預設隨便一個url
  },
  mutations: {
    changePictureDomain(state, payload){
      state.pictureDomain = payload
    }
  },
  actions: {
    getWebSiteConfig (context){
      // 透過getSiteConfig 這api取得整個網站會用到config
      getSiteConfig().then(res=>{
        context.commit('changePictureDomain', res.data?.siteConfig?.statics)
      })
    }
  },
  modules: {
  }
})
