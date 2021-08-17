import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = "'Content-Type': 'multipart/form-data'";
axios.defaults.timeout = 48000

// 前端的axios添加withCredentials属性
axios.defaults.withCredentials = true

class HttpRequest {
    constructor(baseUrl = baseURL) {
      this.baseUrl = baseUrl
    }
    getInsideConfig() {
      const config = {
        baseURL: this.baseUrl
      }
      return config
    }
    interceptors(instance, url) {
      // 请求拦截
      instance.interceptors.request.use(config => {
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            _t: new Date().getTime()
          }
        }
        if(config.method==='post'){
          config.headers.post['Content-Type'] = "'Content-Type': 'multipart/form-data'";

        }

        // 取得 cookie 帶過來的 token
        let cookies = document.cookie;
        let cookieArr = cookies.split(";");
        let authorization;
        for (const element of cookieArr) {
          let value = element.split('=');
          if (value[0] == 'Authorization') authorization = value[1];
        }
        config.headers.Authorization = authorization;
        // TODO
        // config.headers.Authorization = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3VzZXIxNjhhcGkuZ2UzNDUuY29tL2Zyb250ZW5kL3YxL2xpdmUvbG9naW4iLCJpYXQiOjE2MTg5MDUyODEsImV4cCI6MTYyMTQ5NzI4MSwibmJmIjoxNjE4OTA1MjgxLCJqdGkiOiJreXVCT3hHejFHSGtIR2ozIiwic3ViIjoxMDEzMjYzNywicHJ2IjoiODI0NGEwMmU0MWJmMDBmNmQwMDZkODUxNWI1YzZmNjE1YmVmZDI5NiIsInNpZCI6MSwibmFtZSI6IjEzMDAwMDAwMDk5IiwidXNlclR5cGUiOiJtZW1iZXIifQ.bWXJjCu3NHVhq1-2GEKC6cUallEF4vANfxTWb9AeXpY';

        //自行決定是否mark(看後端的api決定)
        if (config.isForm){
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          config.data = qs.stringify(config.data)
        }
        return config
      }, error => {
        return Promise.reject(error)
      })


      // 响应拦截 code 要跟後端確認處理方式
      instance.interceptors.response.use(res => {
        res = res.data
        if (res.code === 5003){
          // 未登入
          return Promise.reject(res)
        }else if (res.code === 5004){
          // 未登入
          return Promise.reject(res)
        }else{
          return Promise.resolve(res)
        }
      }, error => {
        return Promise.reject(error)
      })
    }
    request(options, noShowTip) {
      const instance = axios.create()
      options = Object.assign(this.getInsideConfig(), options)
      this.interceptors(instance, options.url)
      instance.noShowTip = noShowTip
      return instance(options)
    }
  }
  export default HttpRequest;