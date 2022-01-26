import React from "react";
import eNamad from "../img/license/L-1.png";
import Trust from "../img/license/L-2.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
function Footer() {
    
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-5 ">
            <div className="col-md-9">
              <h6>درباره ما</h6>
              <p className="text-justify">
                {" "}
                کلیه حقوق این وب سایت متعلق به گیفت شاپ Giftshop.com و این قالب
                ثبت شده در DMCA Report گوگل و یا همان قوانین کپی رایت آمریکا می
                باشد.
              </p>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6>دسترسی سریع</h6>
            <ul className="footer-links">
              <li>
                <a href="#">تماس با ما</a>
              </li>
              <li>
                <a href="#">درباره ما</a>
              </li>
              <li>
                <a href="#">فروشگاه</a>
              </li>
              <li>
                <a href="#">سوالات متداول</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6>خدمات مشتریان</h6>
            <ul className="footer-links">
              <li>
                <a href="#">قوانین و مقررات</a>
              </li>
              <li>
                <a href="#">شرایط استفاده</a>
              </li>
              <li>
                <a href="#">لیست محصولات</a>
              </li>
              <li>
                <a href="#">حریم خصوصی</a>
              </li>
            </ul>
          </div>
          <div className="col-xs-7 col-md-2">
            {/* <!-- Swiper --> */}
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop
                autoplay
                >
                <SwiperSlide>  <Image src={eNamad}  />
                </SwiperSlide>   
                <SwiperSlide>  <Image src={Trust} alt="slide 1" /> 
                </SwiperSlide>   
            </Swiper>
            
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              تمامی مطالب، عکس ها و... متعلق به سایت فروشگاهی گیفت شاپ می باشد.
              <a href="#" className="text-muted">
                طراحی شده توسط آرش زرندی
              </a>
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons p-0">
              <li>
                <a className="facebook" href="#">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a className="telegram" href="#">
                  <i className="bi bi-telegram"></i>
                </a>
              </li>
              <li>
                <a className="whatsapp" href="#">
                  <i className="bi bi-whatsapp"></i>
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a className="instagram" href="#">
                  <i className="bi bi-instagram"></i>
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