import Image from "next/image";
import React from "react";
import LoginImage from "../../img/login/img-login.png"
import Link from 'next/link'
function Login() {
  const [active, setActive] = React.useState(false)
  return (
  <div class="login">
  <div class="login__content">
      <div class="login__img">
          <Image src={LoginImage} alt="" />
      </div>

      <div class="login__forms register">
        <form action="" class="login__create " id="login-up">
              <h1 class="login__title">ایجاد حساب کاربری</h1>

              <div class="login__box">
                  <i class='bx bx-user login__icon'></i>
                  <input type="tel" placeholder="شماره همراه" class="login__input" />
              </div>

              {/* <div class="login__box">
                  <i class='bx bx-at login__icon'></i>
                  <input type="text" placeholder="ایمیل" class="login__input"/>
              </div> */}

              <div class="login__box">
                  <i class='bx bx-lock-alt login__icon'></i>
                  <input type="password" placeholder="رمز عبور" class="login__input"/>
              </div>
              <div class="login__box">
                  <i class='bx bx-lock-alt login__icon'></i>
                  <input type="password" placeholder="تکرار رمز عبور" class="login__input"/>
              </div>

              <button type="submit" class="login__button btn btn-primary w-100">ثبت نام</button>

              <div>
                  <span class="login__account">حساب کاربری دارید؟</span>
                 <Link href="/login"><a><span class="login__signup mx-2" id="sign-in">وارد شوید</span></a></Link>
              </div>

              <div class="login__social">
                  <a href="#" class="login__social-icon"><i class='bx bxl-facebook' ></i></a>
                  <a href="#" class="login__social-icon"><i class='bx bxl-twitter' ></i></a>
                  <a href="#" class="login__social-icon"><i class='bx bxl-google' ></i></a>
              </div>
          </form>
      </div>
  </div>
</div>
);
}

export default Login;


