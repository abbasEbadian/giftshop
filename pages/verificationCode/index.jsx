import React from "react";
 import "../utils.js"
 
 function index() {
     
   return (
       <>
<button type="button" class="theme"> LIGHT </button>
<form class="verification">
  <section class="verification__wrap">
    <header class="verification__header">
      <h2 class="verification__title">Verification Code</h2>
      <p class="verification__description">
        we was send 4 length verification code, enter it on blow entery
      </p>
    </header>

    <section class="verification__fields">
      <fieldset class="verification__field">
        <legend>
        </legend>

        <input type="text" class="verification__input verification__input--1" id="verification-input-1" placeholder="-" maxlength="1" />
        <input type="text" class="verification__input verification__input--2" id="verification-input-2" placeholder="-" maxlength="1" />
        <input type="text" class="verification__input verification__input--3" id="verification-input-3" placeholder="-" maxlength="1" />
        <input type="text" class="verification__input verification__input--4" id="verification-input-4" placeholder="-" maxlength="1" />
      </fieldset>
    </section>

    <section class="verification__verify">
      <p>
        <button type="button" class="verification__verify_btn">VERIFY</button>
      </p>
    </section>

    <section class="verification__timeout">
      <p>
        wait <strong class="verification__counter">00 : 00</strong> seconds to <button type="button" class="verification__send_new">send new code</button>
      </p>
    </section>

  </section>
</form>
</>
 
   );
 }
 
 export default index;
 