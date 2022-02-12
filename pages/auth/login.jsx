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

function Login() {
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [done, setDone] = React.useState(false)
    
    const dispatch = useDispatch()
    const router = useRouter()
    
    const _login = (e)=>{
        
        try{
            e.preventDefault()
            e.stopPropagation()
            
            if(phone==="" || password==="") {
                toast.warning("اطلاعات به درستی وارد نشده است")
                return;
            }
            setLoading(true)
            dispatch(login({username: phone, password}, '')).then( ({error, message}) =>{
                if(error === 0){
                    toast.success(message)
                    setDone(true)
                    router.push('/')
                }
                else toast.error(message)
                
            })
            .catch(err=>{console.log(err);toast.error("خطا در برقراری ارتباط")})
            .finally(f=>{setLoading(false)})
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
                    className="login__input" 
                    value={phone}
                    onChange={e=>setPhone(e.target.value)}
                    maxlength={11}
                />

                <InputBox
                    parentClass={"login-box ltr"}
                    iconClass={"bi-shield-lock login__icon"}
                    placeholder="رمز عبور"
                    className="login__input" 
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    eye
                />

                <a href="#" class="login__forgot">فراموشی رمز عبور</a>

                <button type="submit" className=" btn btn-primary w-100 login__button d-grid place-items-center" disabled={!phone || !password || loading || done} >
                {loading? <ThreeDots height={10} width={30} color="white"/>:done?"در حال انتقال": " ورود"}
                </button>

                <div>
                    <span className="login__account">حساب کاربری ندارید؟ </span>
                    <Link href="/auth/signup"><a><span className="login__signin" id="sign-up">بسازید!</span></a></Link>
                </div>
            </form>

            
        </div>
    </div>
</div>
);
}

export default withAuth(Login, false);


