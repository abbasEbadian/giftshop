import axios from 'axios'
import { sessionService  } from 'redux-react-session';
export const configure = ()=>{
    axios.interceptors.request.use(
        async config => {
            try{
                const session = localStorage.getItem('token')
                if (config.url&&config.url.indexOf("check_auth") === -1
                 && session  ) {
                    config.headers['Authorization'] = 'Bearer ' + session;
                }
            }catch(err){
                console.log(err);
                return config
            }
            
            return config
            
        },
        error => {
            console.log(error);
            
            Promise.reject(error) 
        }
      );
      axios.interceptors.response.use((response) => {
        return response
      }, 
      async (error)=> {
         if(error.response && error.response.status===400){         
             return Promise.reject(error)
         }     
         
      
        if (error.response && error.response.status === 401 ) {
            
            localStorage.removeItem('token')
            if(window!=="undefined") document.location.href = "/"
           
            return Promise.reject(error)
        }
      
        
      })
}