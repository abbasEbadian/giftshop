import Image from "next/future/image";import React from "react";
import LoginImage from "../../img/login/img-login.png"
import Link from 'next/link'
import withAuth from "../../redux/withAuth";
import InputBox from '../../elements/InputBox'
import {signup} from '../../redux/actions'
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
toast
function Signup() {
    const [phone, setPhone] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [done, setDone] = React.useState(false)
    const [errors, setErrors] = React.useState([])

    const dispatch = useDispatch()
    const router = useRouter()

    const _signup = (e)=>{
        
        try{
            e.preventDefault()
            e.stopPropagation()
            
            if(phone==="" || password==="") {
                toast.warning("اطلاعات به درستی وارد نشده است")
                return;
            }
            setErrors([])
            setLoading(true)
            dispatch(signup({username: phone, password, password2})).then( ({error, message}) =>{
                if(error === 0){
                    toast.success(message)
                    setDone(true)
                    router.push('/auth/login')
                }
                else {
                    console.log(message, typeof message, typeof message==="object");
                    if(typeof message === 'object'){
                        Object.keys(message).map(item=>{
                            return message[item]?.map(item2=>{
                                setErrors(s=>[...s, item2])
                            })
                        })
                    }else{toast.error(message)}
                }
                
            })
            .catch(err=>{console.log(err);toast.error("خطا در برقراری ارتباط")})
            .finally(f=>{setLoading(false)})
        }catch(err){
            console.log(err);
        }

    }  

  return (
  <div class="login">
  <div class="login__content">
      <div class="login__img">
          <Image style={{maxWidth: "100%", height: 'auto'}} src={LoginImage} alt="" />
      </div>

      <div class="login__forms register">
        <form action="" class="login__create " id="login-up" onSubmit={_signup}>
              <h1 class="login__title">ایجاد حساب کاربری</h1>

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
                 <InputBox
                    parentClass={"login-box ltr"}
                    iconClass={"bi-shield-lock login__icon"}
                    placeholder="تکرار رمز عبور"
                    className="login__input" 
                    value={password2}
                    onChange={e=>setPassword2(e.target.value)}
                    eye
                />
            
            <button type="submit" className=" btn btn-primary w-100 login__button d-grid place-items-center" disabled={!phone || !password || !password2 || loading || done} >
                    {loading? <ThreeDots height={10} width={30} color="white"/>:done?"در حال انتقال": " ثبت نام"}
                </button>

              <div>
                  <span class="login__account">حساب کاربری دارید؟</span>
                 <Link href="/auth/login"><a><span class="login__signup mx-2" id="sign-in">وارد شوید</span></a></Link>
              </div>
                <ul className="px-2 mt-4">

                {errors.map(item=>{
                    return <li className="text-danger text-end " style={{fontSize: "12px"}}><small>{item}</small></li>
                })}
                </ul>
              {/* <div class="login__social">
                  <a href="#" class="login__social-icon"><i class='bx bxl-facebook' ></i></a>
                  <a href="#" class="login__social-icon"><i class='bx bxl-twitter' ></i></a>
                  <a href="#" class="login__social-icon"><i class='bx bxl-google' ></i></a>
              </div> */}
          </form>
      </div>
  </div>
</div>
);
}

export default withAuth(Signup,false);


