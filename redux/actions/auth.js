import * as t from '../types'
import * as e from '../endpoints'
import axios from 'axios'
import { get_cart } from '.'

export const logout = (router)=>{
    return dispatch=>{
        localStorage.removeItem('token')
        dispatch({type:t.UPDATE_STATUS, payload: false})
        dispatch({type:t.UPDATE_USER, payload: {}})
        if(typeof window!== "undefined") document.location.href = "/"
    }
}
export const profile = ()=>{
    return dispatch=>{
        axios.get(e.PROFILE)
        .then(response=>{
            const {data} = response
            dispatch({type:t.UPDATE_USER, payload: data})

        })
        .catch(err=>{
            console.log(err)
        })

    }
}
export const login = (info, next)=>{
    return (dispatch) => {
        
        return new Promise((resolve, reject)=>{
            axios.post(e.LOGIN, info)
            .then((response)=>{
                const {data} = response
                if(response.status === 200){
                    localStorage.removeItem('token')
                    localStorage.setItem('token', data.token)
                    dispatch({type:t.UPDATE_STATUS, payload: true})
                    dispatch(profile())
                    dispatch(get_cart())
                    return resolve({error: 0, message: "با موفقیت وارد شدید."})
                }
                
                return resolve({error: 1, message: data.message})
            })
            .catch(err=>{
                console.log(err)

                if(err.response?.status === 401 || err.response?.status === 400)
                    return resolve({error: 1, message: err.response?.data?.message})

                return resolve({error: 1, message: "خطا در برقراری ارتباط"})
            })
        })
    }
}
export const signup = (info)=>{
    return (dispatch) => {
        
        return new Promise((resolve, reject)=>{
            axios.post(e.REGISTER, info)
            .then((response)=>{
                const {data} = response
                if(response.status === 200 || response.status === 201){
                    return resolve({error: 0, message: "حساب با موفقیت ایجاد شد"})
                }
                
                return resolve({error: 1, message: "خطا در برقراری ارتباط"})
            })
            .catch(err=>{
                console.log(err)

                if(err.response?.status === 401 || err.response?.status === 400)
                    return resolve({error: 1, message: err.response?.data})
                return resolve({error: 1, message: "خطا در برقراری ارتباط"})
            })
        })
    }
}