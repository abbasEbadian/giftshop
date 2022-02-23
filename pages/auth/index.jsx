import Image from "next/image";
import React from "react";
import LoginImage from "../../img/login/img-login.png"
import Link from 'next/link'
import {login} from '../../redux/actions'
import {toast} from 'react-toastify'
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import InputBox from '../../elements/InputBox'
import withAuth from "../../redux/withAuth";
import { useRouter } from "next/router";
import axios from "axios";
import { SEND_AUTH_CODE } from "../../redux/endpoints";

function Login() {
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [done, setDone] = React.useState(false)
    const [codeSent, setCodeSent] = React.useState(false)
    const [timer, setTimer] = React.useState(0)
    const dispatch = useDispatch()
    const router = useRouter()


    setTimeout(setTimeout(()=>{
        if(timer > 0 ) setTimer(timer-1)
    }, 1000))

    const _login = (e, resend_code=false)=>{
        e.preventDefault()
        e.stopPropagation()
        
        try{
            if (!codeSent || resend_code){
                console.log(phone);
                setLoading(true)
                axios.post(SEND_AUTH_CODE, {mobile: phone})
                .then((response)=>{
                    const {data} = response
                    if (data.error === 1)
                        toast.error(data.message)
                    else{
                        toast.success(data.message)
                        setCodeSent(true)
                        setTimer(120)
                    }
                })
                .catch(e=>console.log(e))
                .finally(f=>setLoading(false))
            }else{

                dispatch(login({mobile: phone, code: password}, '')).then( ({error, message}) =>{
                    if(error === 0){
                        toast.success(message)
                        setDone(true)
                        router?.push('/')
                    }
                    else toast.error(message)
                    
                })
            .catch(err=>{console.log(err);toast.error("خطا در برقراری ارتباط")})
            .finally(f=>{setLoading(false)})
            }
        }catch(err){
            console.log(err);
        }

    }  


    return (
    <div className="login">
    <div className="login__content">
        <div className="login__img">
            <Image src={LoginImage} alt="" />
        </div>

        <div className="login__forms login2">
            <form action="" class="login__registre" id="login-in" onSubmit={_login}>
                <h1 class="login__title">ورود به حساب</h1>
                <InputBox
                    parentClass={"login-box ltr"}
                    iconClass={"bi-phone login__icon"}
                    type="tel"
                    placeholder="شماره همراه"
                    className="login__input text-center" 
                    value={phone}
                    onChange={e=>setPhone(e.target.value)}
                    maxlength={11}
                />
                {codeSent? <>
                    <InputBox
                        parentClass={"login-box ltr"}
                        iconClass={"bi-shield login__icon"}
                        type="tel"
                        placeholder="کد 5 رقمی ارسال شده"
                        className="login__input text-center" 
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        maxlength={5}
                    />
                
                    {timer>0?
                         <><small>ارسال دوباره بعد از 
                            <span className="text-success px-2">{Math.floor(timer/60)}:{String(timer%60).padStart(2, "0")}</span>
                              
                            دقیقه</small></>
                        :<small onClick={e=>_login(e, 1)} className="text-info cursor-pointer">ارسال دوباره</small>
                    }
                    </>
                    
                :null}


                

                <button type="submit" className=" btn btn-primary w-100 login__button d-grid place-items-center" disabled={!phone || (codeSent && !password) || loading || done} >
                    {loading? <ThreeDots height={10} width={30} color="white"/>:done?
                    
                    "در حال انتقال" 
                    : "ورود / ثبت نام"}
                </button>

            </form>

            
        </div>
    </div>
</div>
);
}

export default withAuth(Login, false);

