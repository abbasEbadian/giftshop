import React from "react";
import Head from "next/head";
import card from "../img/other/Card.png";
import Image from "next/image";
import mouse from "../img/icon/Mouse-alt.png";
import arrows from "../img/icon/Arrows.svg";
import off from "../img/icon/ShoppingIconic.png";
import cardFolding from "../img/icon/Cards-folding3.png";
import pie from "../img/icon/Group3452.png";
import income from "../img/icon/IncomeIconic.png";
import logos from "../img/card/logos.png";
import collapse from "../img/icon/Collapse.png";
import why from "../img/other/why.png";


import {
  ChevronLeft,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import SimilarCards from "../components/SimilarCards";
import HomeUtilities from "../components/subHome/HomeUtilities";
import Link from "next/link";

export default function Home() {
  const [active, setActive] = React.useState("day");
  
  return (
    <>
      <div className="mcontainer mcontainer-bg">
        <Head>
          <title>GiftShop | گیفت شاپ</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="وبسایت مرجع خرید انواع گیفت کارت"/>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
          />
        </Head>
        <style JSX>{`
        .bgimage{
          overflow: hidden;
          z-index: -1;
        }
      `}</style>
        <main className="main-page flex-wrap">
          <div className="content1 d-flex flex-column justify-content-center col-12 col-md-4 pe-lg-5 p-0">
            <h3 className="fs-2 ">
              گیفت <Image src={card} width={36} height={24} /> کارت های متنوع
            </h3>
            <h3 className="fs-3 mt-3 mb-5 text-nowrap">
              خرید <span className="text-secondary">سریع</span> {" و "}
              <span className="text-secondary">آسان</span> {" و "}
              همراه با <span className="text-secondary">امنیت بالا</span>
            </h3>
            <p className="text-justify">
              انواع مختلف گیفت‌کارت با نازل‌ترین قیمت‌ها، قابل استفاده در
              پلتفرم‌ها و سایت‌های گوناگون. جهت خریدهای آنلاین، خرید اکانت‌های
              ویژه/پریمیوم، سهولت و کاهش هزینه‌ها در شارژ حساب‌های کاربری
              (پلی‌استیشن، آی‌تونز، گوگل‌پلی، اسپاتیفای،...) و کاربردهای دیگر
            </p>
            <button className="btn success-gradient d-flex justify-content-between  align-items-center mt-3">
              <Link href="/shop ">
                <a className="text-white py-3 w-75 text-end">جستجوی سریع و خرید کارت</a>
              </Link>
              <ChevronLeft />
            </button>
          </div>
          <div className="col-md-2 col-0"></div>
          <div className="images col-md-6 col-12">
            <div className="row">
              <div className="col-md-4 col-6 d-flex align-items-center pic-head1">
                <Image src={off} />
              </div>
              <div className="col-8 pic-head2">
                <Image src={cardFolding} />
              </div>
              <div className="col-6 pic-head3">
                <div className="varity-image d-grid place-items-center position-relative ">
                  <Image src={pie} width={280} height={280} />
                  {/* <span className="varity-span">
                    انواع <br />
                    گیفت کارت
                  </span> */}
                </div>
              </div>
              <div className="col-6 pic-head4">
                <Image src={income} />
              </div>
            </div>
          </div>

          <div className="col-12 footing d-flex align-items-end justify-content-between mt-auto pb-2">
            <span></span>
            <button className="scroll-down d-flex align-items-center justify-content-center flex-column">
              <span calssName="mb-2">
                <Image src={mouse} alt="mouse" />
              </span>
              <Image src={arrows} alt="arrows" />
            </button>
            <div className="socials d-flex align-items-cetnter flex-column justify-content-center">
              <YouTube />
              <span className="my-2">
                <Instagram />
              </span>
              <Twitter />
            </div>
          </div>
        </main>
        <HomeUtilities />

        <SimilarCards
          addToCard
          product={undefined}
          title={
            <span>
              {"پرفروش ترین"} <span className="text-secondary">گیفت </span>{" "}
              کارتها
            </span>
          }
        >
          <div className="row mb-3 mt-5">
            <div className="col-6 col-md-3">
              <button
                onClick={(e) => setActive("day")}
                className={
                  "btn w-100 " +
                  (active !== "day"
                    ? "primary-outline py-3"
                    : "primary-gradient py-3")
                }
              >
                امروز
              </button>
            </div>
            <div className="col-6 col-md-3">
              <button
                onClick={(e) => setActive("week")}
                className={
                  "btn w-100 " +
                  (active !== "week"
                    ? "primary-outline py-3"
                    : "primary-gradient py-3")
                }
              >
                هفته اخیر
              </button>
            </div>
            <div className="col-6 col-md-3">
              <button
                onClick={(e) => setActive("month")}
                className={
                  "btn w-100 " +
                  (active !== "month"
                    ? "primary-outline py-3"
                    : "primary-gradient py-3")
                }
              >
                ماه گذشته
              </button>
            </div>
            <div className="col-6 col-md-3">
              <button
                onClick={(e) => setActive("6month")}
                className={
                  "btn w-100 " +
                  (active !== "6month"
                    ? "primary-outline py-3"
                    : "primary-gradient py-3")
                }
              >
                شش ماه اخیر
              </button>
            </div>
          </div>
        </SimilarCards>
        <div className="my-5 d-flex"></div>
        <SimilarCards
          product={undefined}
          title={
            <span>
              {"محصولات"} <span className="text-secondary">فروشگاه </span>
            </span>
          }
        />
        <SimilarCards
          product={undefined}
          title={
            <span>
              {"محصولات"} <span className="text-secondary">محبوب </span>
            </span>
          }
        />
        <div className="d-flex justify-content-end my-5">
          <div className="bgimage flex-grow-1 position-relative mx-2">
            <Image
              alt="Mountains"
              src={logos}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <Link href="/shop">
            <a className="btn primary-gradient mr-2 ">مشاهده همه محصولات</a>
          </Link>
        </div>
      </div>
      <div className="whyus secondary-gradient-90 py-4">
        <div className="mcontainer">
          <h3 className="text-center mb-md-0 mb-5">
            <Image src={collapse} /> <b className="mx-2">چرا گیفت استاپ؟</b>{" "}
          </h3>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="col-12 col-md-5">
              <div className="pt-5 pb-4">
                <h4>تنوع در محصولات :</h4>
                <p>
                  شما میتوانید کامل ترین آرشیو گیفت کارت های موجود در بازار را
                  فقط در فروشگاه اینترنتی گیفت استاپ بیابید.
                </p>
              </div>
              <div className="pt-5 pb-4">
                <h4>قیمت و کیفیت :</h4>
                <p>
                  همانطور که رضابت کاربران ، مهمترین اصل و هدف گروه گیفت استاپ
                  میباشد ، مفتخر به ارائه نازل‌ترین قیمت ها هستیم.
                </p>
              </div>
              <div className="pt-5 pb-4">
                <h5>
                  {" "}
                  همواره در تلاشیم تا با بالانگه داشتن کیفیت محصولات ارائه
                  بالاترین سطح از پشتیبانی ، در کنار تمامی کاربران گرامی باشیم.{" "}
                </h5>
              </div>

              <button className="btn shadow bg-white d-flex justify-content-between py-3 mt-3">
                جستجوی سریع و خرید کارت
                <ChevronLeft />
              </button>
            </div>

            <div className="col-md-6 col-12 mt-md-0 mt-5">
              <Image src={why} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
