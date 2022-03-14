import React from "react";
import eNamad from "../img/license/L-1.png";
import Trust from "../img/license/L-2.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from "react-redux";
import Script from 'next/script'
function Footer() {
    
  const config = useSelector(s=>s.main.configs)
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 ">
            <div className="col-md-9">
              <h6>{config?.contactus?.footer_about_title}</h6>
              <p className="text-justify">
                {" "}
                {config?.contactus?.footer_about_content}
              </p>
            </div>
            <div className="col-md-9">
              شماره تماس : 
              {"  "}
              {config?.contactus?.phone_number_1}
              {"  "}
            </div>
            <div className="col-md-9">
              ایمیل : 
              {"  "}
              {config?.contactus?.website_email}
              
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6>دسترسی سریع</h6>
            <ul className="footer-links">
              <li>
                <Link href="/contact-us">
                  <a >تماس با ما</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <a >درباره ما</a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a >فروشگاه</a>
                </Link>
              </li>
             
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6>خدمات مشتریان</h6>
            <ul className="footer-links">
              <li>
                <Link href="/terms">
                  <a>قوانین و مقررات</a>
                </Link>
              </li>
              <li>
                <a href="https://blog.giftstop.org">بلاگ</a>
              </li>
              
              <li>
                <Link href="/faq">
                  <a >سوالات متداول</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 row">
            <div className="col-6">  
              <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=265392&amp;Code=c2wlsvTOBsHuWhbaPdwl"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=265392&amp;Code=c2wlsvTOBsHuWhbaPdwl" alt="" style={{"cursor":"pointer"}} id="c2wlsvTOBsHuWhbaPdwl"/></a>
            </div>   
            <div className="col-6">  
              <span id="PPTrust" >
              <a referrerpolicy="origin" href="https://oauth.payping.ir/trust" title="نماد اعتماد پی‌پینگ" onclick="event.preventDefault();window.open('https://oauth.payping.ir/trust','_blank','location=yes,height=720,width=520,scrollbars=yes,status=yes');"><img style={{width: "96px",  height: "115px"}} src="https://cdn.payping.ir/statics/Payping-logo/Trust/white.svg" alt="نماد اعتماد پی‌پینگ" referrerpolicy="origin"/></a>
              </span>
            </div>  
            
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              تمامی مطالب، عکس ها و... متعلق به سایت فروشگاهی گیفت استاپ می باشد.
              <br />
              طراحی و اجرا: 
              <a href="https://t.me/awrshhhhh" className="text-muted mx-3">آرش زرندی</a> -
              <a href="https://t.me/EbadianAbbas" className="text-muted mx-3">عباس عبادیان</a>
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons p-0">
              <li>
                <a className="pt-1 facebook" target={"_blank"} href={config&&config.contactus&&config.contactus.facebook_link?config.contactus.facebook_link: "https://facebook.com"}>
                  <i className="bi fs-4 bi-facebook"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 telegram" target={"_blank"} href={config&&config.contactus&&config.contactus.telegram_link?config.contactus.telegram_link: "https://telegram.org"}>
                  <i className="bi fs-4 bi-telegram"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 whatsapp" target={"_blank"} href={config&&config.contactus&&config.contactus.whatsapp_link?config.contactus.whatsapp_link: "https://whatsapp.org"}>
                  <i className="bi fs-4 bi-whatsapp"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 twitter" target={"_blank"} href={config&&config.contactus&&config.contactus.twitter_link?config.contactus.twitter_link: "https://twitter.com"}>
                  <i className="bi fs-4 bi-twitter"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 instagram" target={"_blank"} href={config&&config.contactus&&config.contactus.instagram_link?config.contactus.instagram_link: "https://instagram.com"}>
                  <i className="bi fs-4 bi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;