import React from "react";
import { useState } from "react";
import Image from 'next/image'
import faqsimg from "../../img/other/image6.png";
import abouthelp from "../../img/other/image3.png";
import Head from "next/head";
import { useSelector } from "react-redux";
import Link from 'next/link'
function Faqs() {
  const configs = useSelector(s=>s.main.configs)
  const [selected, setSelected] = useState(null);
  const [dataFaqs, setDataFaqs] = React.useState([]);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  React.useEffect(()=>{
    if(configs && configs.faq)
      setDataFaqs(configs.faq)
  }, [configs])
  return (
    <>
      <section>
        <Head><title>پرسش پاسخ | گیفت شاپ</title></Head>
        <div className="container mw-100 w-100">
          <div className="row">
            <div className="aboutimg">
              <Image src={faqsimg}></Image>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 contact-us m-auto">
              <h3 className="text-basket text-center py-4">
                سوالات <span> متداول</span>
              </h3>
              <p className="text-center pb-5">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شص
              </p>
            </div>
            <div className="col-12 content-faqs">
              <div className="wrapper col-12 col-lg-8 col-md-8 m-auto">
                <div className="accordion">
                  {dataFaqs.map((items, idx) => (
                    <div className="item" key={idx}>
                      <div className="title" onClick={() => toggle(idx)}>
                        <h5>{items.question}</h5>
                        <span>{selected === idx ? "-" : "+"}</span>
                      </div>
                      {/* <div className={selected === i ? 'content show' : 'content'}</div> */}
                      <div
                        className={selected === idx ? "content show" : "content"}
                      >
                        {items.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mw-100 w-100 mt-5">
        <div className="row">
          <div className="col-12 about-help mt-5">
            <div className="right-section col-lg-4">
              <Image src={abouthelp} height={260} width={400}/>
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
    </>
  );
}


export default Faqs;
