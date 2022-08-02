import React from "react";
import Link  from "next/link";
import Image  from "next/image";

import aboutimg from "../../img/other/image2.png";
import aboutimg1 from "../../img/other/image4.png";
import aboutimg2 from "../../img/other/image5.png";
import abouthelp from "../../img/other/image3.png";
import Head from "next/head";

import {useSelector} from 'react-redux'

function AboutUs() {
  const configs = useSelector(s=>s.main.configs)

  return (
    <section>
      <Head><title>درباره ما | گیفت استاپ</title></Head>

      <div className="container mw-100 w-100">
        <div className="row">
          <div className="aboutimg">
            <Image src={aboutimg}></Image>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-between align-items-center flmd">
          <div className="col-12 contact-us m-auto">
            <h3 className="text-basket text-center py-4">
              درباره <span> ما</span>
            </h3>
          </div>
          <div className="col-12 col-lg-5 col-md-6">
            <h6>{configs && configs.aboutus?.title_1}</h6>
            <p className="text-justify">
            {configs && configs.aboutus?.content_1}
            </p>
          </div>
          <div className="col-12 col-lg-5 col-md-5">
            <div className="img-about">
              <Image src={aboutimg1}></Image>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-md-5">
            <div className="img-about my-3">
              <Image src={aboutimg2}></Image>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-md-6">
            <h6>{configs && configs.aboutus?.title_2}</h6>
            <p className="text-justify">
            {configs && configs.aboutus?.content_2}
            </p>
          </div>
        </div>
      </div>
      <div className="container mw-100 w-100 mt-5">
        <div className="row">
          <div className="col-12 about-help mt-5">
            <div className="right-section col-lg-4 my-3">
              <Image src={abouthelp} height={260} width={400}/>
            </div>
            <div className="left-section col-12 col-lg-7 flmd">
              <div className="text-about-info">
                <p>به راهنمایی بیشتری نیاز دارید؟ <Link href="/contact-us" ><a className="btn-contact text-nowrap">تماس با ما</a></Link></p>
                <span>تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست.</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;