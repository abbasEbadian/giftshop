import React from "react";
import Link  from "next/link";
import Image  from "next/image";

import aboutimg from "../../img/other/image2.png";
import aboutimg1 from "../../img/other/image4.png";
import aboutimg2 from "../../img/other/image5.png";
import abouthelp from "../../img/other/image3.png";
import Head from "next/head";

function AboutUs() {
  return (
    <section>
      <Head><title>درباره ما | گیفت شاپ</title></Head>

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
          <div className="col-6 col-lg-5 col-md-6">
            <h6>داستان ما</h6>
            <p className="text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>
          <div className="col-6 col-lg-5 col-md-5">
            <div className="img-about">
              <Image src={aboutimg1}></Image>
            </div>
          </div>
          <div className="col-6 col-lg-5 col-md-5">
            <div className="img-about">
              <Image src={aboutimg2}></Image>
            </div>
          </div>
          <div className="col-6 col-lg-5 col-md-6">
            <h6>انواع گیفت‌کارت</h6>
            <p className="text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>
        </div>
      </div>
      <div className="container mw-100 w-100 mt-5">
        <div className="row">
          <div className="col-12 about-help mt-5">
            <div className="right-section col-lg-4">
              <Image src={abouthelp} />
            </div>
            <div className="left-section col-12 col-lg-7 flmd">
              <div className="text-about-info">
                <p>به راهنمایی بیشتری نیاز دارید؟</p>
                <span>تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست.</span>
              </div>
              <Link href="/contact-us" className="btn-contact"><a >تماس با ما</a></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;