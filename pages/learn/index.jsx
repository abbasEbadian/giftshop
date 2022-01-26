import React from "react";
import learnimg from "../../img/other/image32.png";
import learnimg1 from "../../img/other/image34.png";
import learnimg2 from "../../img/other/image35.png";
import learnimg3 from "../../img/other/image36.png";
import learnimg4 from "../../img/other/image37.png";
import learnimg5 from "../../img/other/image38.png";
import Image from 'next/image'
function Learn() {
  return (
    <section>
      <div className="container mw-100 w-100">
        <div className="row">
          <div className="aboutimg">
            <Image src={learnimg}></Image>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-5">
          <div className="col-12 contact-us m-auto">
            <h3 className="text-basket text-center py-4">
              نحوه استفاده از <span>گیفت</span> کارت های اپل
            </h3>
          </div>
          <div className="col-12 content-faqs m-auto">
            <div className="text-learn">
              <p>
                گیفت کارت آیتونز شامل یک کد است که شما برای شارژ اکانت اپل ایدی
                خود باید این کد را در ایتونز وارد ( به اصطلاح redeem ) کنید. این
                کد شامل 16 کاراکتر است که با حرف X شروع می شود. در صورت نیاز می
                توانید از طریق صفحه خرید گیفت کارت آیتونز این کد را خریداری
                نمایید. شما از دو طریق می توانید کد گیفت کارت آیتونز را وارد
                نمایید. روش اول با استفاده از دستگاه آیفون و آیپد و روش دوم با
                استفاده از مک یا PC (ویندوز) می باشد، که در زیر توضیح داده شده
                است :
              </p>
              <p>
                روش اول : استفاده از آیفون یا آیپداگر iOS شما 11 یا بالاتر است
                :برای دیدن نسخه iOS خود به Setting > General > About > Version
                بروید‌ابتدا اپل ایدی خود را در iTunes&App Store وارد نمایید. در
                این لینک آموزش استفاده و وارد کردن اپل ایدی در ایتونز آورده شده
                است.
              </p>
              <p>
                برنامه AppStore را باز کنید و در پنجره باز شده بر روی عکس
                پروفایل آبی رنگ کلیک نمایید ( بالا سمت راست ). بر روی "Redeem
                Gift Card or Code" کلیک کنید. در این اینجا ممکن است اپل از شما
                رمز اپل ایدی تان را بپرسد٬ آن را وارد کنید و بر روی Sign in کلیک
                کنید. سپس در صفحه باز شده بر روی "You can also enter your code
                manually." کلیک نمایید. سپس کد 16 رقمی گیفت کارت خود را وارد
                نمایید و بر روی Redeem کلیک نمایید تا اکانت اپل ایدی شما شارژ
                شود
              </p>
              <div>
                <Image src={learnimg1}></Image>
              </div>
              <p>
                در صورتی که iOS شما از 11 پایین تر است :ابتدا اپل ایدی خود را در
                iTunes&App Store وارد نمایید. در این لینک آموزش استفاده و وارد
                کردن اپل ایدی در ایتونز آورده شده است.
              </p>
              <div className="img-learn-photo">
                <div className="col-lg-6 col-6">
                  <p>
                    بر روی App Store یا iTunes Store کلیک نمایید و در پنجره باز
                    شده گزینه ی Featured را انتخاب نمایید و سپس به پایین بخش
                    Featured بروید و Redeem را انتخاب کنید.
                  </p>
                </div>
                <div className="col-lg-6 col-6 text-center">
                  <Image src={learnimg2}></Image>
                </div>
              </div>
              <div className="img-learn-photo">
                <div className="col-lg-6 col-6 text-center">
                  <Image src={learnimg3}></Image>
                </div>
                <div className="col-lg-6 col-6">
                  <p>
                    در صفحه باز شده بر روی "You can also enter your code
                    manually." کلیک نمایید.
                  </p>
                  <p>
                    سپس کد 16 رقمی گیفت کارت خود را وارد نمایید و بر روی Redeem
                    کلیک نمایید تا اکانت اپل ایدی شما شارژ شود.{" "}
                  </p>
                </div>
              </div>
              <div className="danger-title-faqs">
                <a href="#">
                  همچنین بخوانید: آموزش‌های لازم برای جلوگیری از سودجویی
                  فروشنده‌های غیرمجاز
                </a>
              </div>
            </div>
            <div className="text-learn">
              <h5>روش دوم : استفاده از مک یا ویندوز</h5>
              <span>
                استفاده از مک یا ویندوز بر روی لپ تاپ خود iTunes را باز کنید.
                اگر از ویندوز استفاده می کنید باید iTunes را دانلود و نصب کنید و
                اگر از مک استفاده می نمایید iTunes به صورت پیش فرض بر روی آن نصب
                است. اپل آیدی خود را در آیتونز، Sign In نمایید. بر روی نام اپل
                ایدی خود کلیک نمایید و از منوی باز شده گزینه Redeem را انتخاب
                کنید
              </span>
              <div className="text-center py-5">
                <Image src={learnimg4}></Image>
              </div>
              <span>
                رمز عبور اپل ایدی خود را دوباره وارد نمایید و سپس کد گیفت کارت
                را وارد کرده و بر روی Redeem کلیک نمایید.
              </span>
              <div className="text-center py-5">
                <Image src={learnimg5}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Learn;
