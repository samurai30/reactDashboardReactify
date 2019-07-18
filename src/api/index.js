import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent,global.Promise);
const API_ROOT = 'http://127.0.0.1:8000/api';

const responseBody = res => res.body;

let token = null;

const tokenPlugin = secured =>{
   return(request)=>{
   if (token && secured)  {
      request.set('Authorization', `Bearer ${token}`)
   }
   };
};

export const api = {
   get:(url,secured = true) =>{
      return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody)
   },
   post:(url,body = null,secured = true)=>{
      console.log(body);
      return superagent.post(`${API_ROOT}${url}`,body).use(tokenPlugin(secured)).then(responseBody)
   },
   setToken:(newToken) => token = newToken
};