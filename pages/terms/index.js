import React from "react";
import faqsimg from "../../img/other/terms_conditions-01.png";
import Image from 'next/future/image';
import Head from 'next/head'
import {useSelector} from 'react-redux'

function Terms() {
  const configs = useSelector(s=>s.main.configs)
  return (
    <section>
      <Head>
        <title>قوانین | گیفت استاپ</title>
      </Head>

      <div className="container mw-100 w-100">
        <div className="row">
          <div className="aboutimg">
            <Image style={{maxWidth: "100%", height: 'auto'}} src={faqsimg}></Image>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row py-5">
          <div className="col-12 contact-us m-auto">
            <h3 className="text-basket text-center py-4">
              قوانین و <span> مقررات</span>
            </h3>
          </div>
          <div className="col-12 content-Terms m-auto">
            <div className="text-Terms">
              <div className="title-Terms">
                <ol>
                  {
                    configs&&configs.rules&&configs.rules.content2&&configs.rules.content2.split("-").map((item, idx)=>{
                      return item && <li key={idx}>{item}</li>
                    })
                  }
                </ol>
                
              </div>
              {/* <div className="danger-title-Terms">
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;