import { ChevronLeft } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import collapse from "../../img/icon/Collapse.png";
import why from "../../img/other/why.png";

function HomeWhyUs() {
  return (
    <div className="whyus secondary-gradient-90 py-4" >
        <div className="mcontainer">
          <h3 className="text-center mb-md-0 mb-5">
            <Image src={collapse} alt={"collapse"} /> <b className="mx-2">چرا گیفت استاپ؟</b>{" "}
          </h3>
          <div className="d-flex align-items-stretch justify-content-between flex-wrap">
            <div className="col-12 col-md-5">

              <div className="pt-5 pb-4" >
                <h4>خرید گیفت کارت و تنوع در محصولات:</h4>
                <p className="fw-light">
                  شما میتوانید کامل ترین آرشیو گیفت کارت های موجود در بازار را فقط در فروشگاه اینترنتی گیفت استاپ پیدا کنید.
                  برای خرید گیفت کارت به بخش فروشگاه مراجعه نمائید.
                </p>
              </div>
              <div className="pt-5 pb-4" >
                <h4>قیمت و کیفیت:</h4>
                <p className="fw-light">
                همانطور که رضایت کاربران، مهمترین اصل و هدف گروه گیفت استاپ میباشد، مفتخر به ارائه نازل‌ترین قیمت ها هستیم.
                </p>
              </div>
              <div className="pt-5 pb-4" >
                <h4>پشتیبانی پس از خرید:</h4>
                <p className="fw-light">
                همواره در تلاشیم تا با ارائه بالاترین سطح از خدمات و پشتیبانی، در کنار شما کاربران گرامی باشیم و در اسرع وقت به سوالات شما عزیزان پاسخ می دهیم.
                </p>
              </div>

              <Link href="/shop"><a className="btn shadow bg-white d-flex justify-content-between py-3 mt-3">
                جستجوی سریع و خرید کارت
                <ChevronLeft />
              </a></Link>
            </div>

            <div className="col-md-6 col-12 mt-md-0 mt-5 position-relative" >
              <Image src={why} layout="fill" objectFit="contain" alt='various cards' />
            </div>
          </div>
        </div>
      </div>
  )
}

export default HomeWhyUs