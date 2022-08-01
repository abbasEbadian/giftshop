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
                <Link href="/faq">
                  <a >سوالات متداول</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 row">
            <div className="col-4">  
              <a referrerPolicy="origin"  rel="nofollow noopener" target="_blank" href="https://trustseal.enamad.ir/?id=265392&amp;Code=c2wlsvTOBsHuWhbaPdwl"><img referrerPolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=265392&amp;Code=c2wlsvTOBsHuWhbaPdwl" alt="" style={{"cursor":"pointer"}} id="c2wlsvTOBsHuWhbaPdwl"/></a>
            </div>   
            
            <div className="col-4">  
              <span id="PPTrust" >
              <img referrerPolicy='origin' id = 'rgvjesgtjxlznbqeesgtnbqe' style = {{cursor:"pointer"}} onClick ={e=>window.open("https://logo.samandehi.ir/Verify.aspx?id=301202&p=xlaoobpdrfthuiwkobpduiwk", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")} alt = 'logo-samandehi' src = 'https://logo.samandehi.ir/logo.aspx?id=301202&p=qftilymanbpdodrflymaodrf' />              </span>
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
              <a href="https://t.me/awrshhhhh"  rel="nofollow noopener" className="text-muted mx-3">آرش زرندی</a> -
              <a href="https://t.me/EbadianAbbas"  rel="nofollow noopener" className="text-muted mx-3">عباس عبادیان</a>
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons p-0">
              <li>
                <a className="pt-1 facebook" target={"_blank"}  rel="nofollow noopener" href={config&&config.contactus&&config.contactus.facebook_link?config.contactus.facebook_link: "https://facebook.com"}>
                  <i className="bi fs-4 bi-facebook"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 telegram" target={"_blank"}  rel="nofollow noopener" href={config&&config.contactus&&config.contactus.telegram_link?config.contactus.telegram_link: "https://telegram.org"}>
                  <i className="bi fs-4 bi-telegram"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 whatsapp" target={"_blank"}  rel="nofollow noopener" href={config&&config.contactus&&config.contactus.whatsapp_link?config.contactus.whatsapp_link: "https://whatsapp.org"}>
                  <i className="bi fs-4 bi-whatsapp"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 twitter" target={"_blank"}  rel="nofollow noopener" href={config&&config.contactus&&config.contactus.twitter_link?config.contactus.twitter_link: "https://twitter.com"}>
                  <i className="bi fs-4 bi-twitter"></i>
                </a>
              </li>
              <li>
                <a className="pt-1 instagram" target={"_blank"}  rel="nofollow noopener" href={config&&config.contactus&&config.contactus.instagram_link?config.contactus.instagram_link: "https://instagram.com"}>
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