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

      <div class="login__forms login2">
          <form action="" class="login__registre" id="login-in">
              <h1 class="login__title">فراموشی رمز عبور</h1>

              <div class="login__box">
                  <i class='bx bx-user login__icon'></i>
                  <input type="tel" placeholder="شماره همراه" class="login__input"/>
              </div>

              <div class="login__box">
                  <i class='bx bx-lock-alt login__icon'></i>
                  <input type="password" placeholder="رمز عبور" class="login__input"/>
              </div>
              <a href="#" class=" btn btn-primary w-100 login__button" >ارسال کد</a>
          </form>
      </div>
  </div>
</div>
);
}

export default Login;