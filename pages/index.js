import React, { useMemo } from "react";
import Head from "next/head";
import card from "../img/other/Card.png";
import Image from "next/image";
import mouse from "../img/icon/Mouse-alt.png";
import arrows from "../img/icon/Arrows.svg";
import off from "../img/icon/ShoppingIconic.png";
import cardFolding from "../img/icon/Cards-folding3.png";
import pie from "../img/icon/Group3452.png";
import income from "../img/icon/IncomeIconic.png";
import collapse from "../img/icon/Collapse.png";
import _why from "../img/other/why.png";
import  BrandList from '../components/BrandList'
import {useSelector } from 'react-redux'
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
import * as e from '../redux/endpoints'
import { Box, Typography } from "@mui/material";
import intro from '../img/icon/giftstop-01.png'
export default function Home({data}) {
  const [active, setActive] = React.useState("today");
  const popular_cards = useSelector(s=>s.main.popular_cards)
  const top_sale_cards = useSelector(s=>s.main.top_sale_cards)
  const config = useSelector(s=>s.main.configs)

  const intro_image = useMemo(() => {
    if(config?.website?.index_intro_image){
      return e.BASE_URL + config.website.index_intro_image
    }
    return intro
  }, [config])

  const why = useMemo(() => {
    if(config?.website?.orange_image){
      return e.BASE_URL + config.website.orange_image
    }
    return _why
  }, [config])

  return (
    <>
      <div className="mcontainer mcontainer-bg pb-5">
        <Head>
          <title>{data.index_title??"GiftStop | گیفت استاپ"}</title>
          <meta name="description" content={data.index_description??"وبسایت مرجع خرید انواع گیفت کارت"}/>
          <meta name="keywords" content={data.index_keywords??"گیفت کارت , گیفت کارت ارزان"}/>
          <link rel="icon" href="/fav.png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          
        </Head>
        <style jsx>{`
        .bgimage{
          overflow: hidden;
          z-index: -1;
        }
      `}</style>
        <section id="bg-header-new">
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
              {config?.website?.index_intro_text??  <span>
                انواع مختلف 
                {" "}<Typography sx={{fontSize: "1rem", fontWeight: "bold", display: "inline"}} component="h1" >گیفت‌ کارت</Typography> با نازل‌ترین قیمت‌ها، قابل استفاده در
                پلتفرم‌ها و سایت‌های گوناگون. جهت خریدهای آنلاین، خرید اکانت‌های
                ویژه ، پریمیوم، سهولت و کاهش هزینه‌ها در شارژ حساب‌های کاربری
                (پلی‌استیشن، آی‌تونز، گوگل‌پلی، اسپاتیفای،...) و کاربردهای دیگر
              </span>}
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
            
            <Image src={intro_image} alt="intro" layout="fill" objectFit="contain"/>
          </div>

          <div className="col-12 footing d-flex align-items-end justify-content-center mt-auto pb-2">
            <span></span>
            <a href="#utilities" className="scroll-down d-flex align-items-center justify-content-center flex-column bg-transparent">
              <span className="mb-2">
                <Image src={mouse} alt="mouse" />
              </span>
              <Image src={arrows} alt="arrows" />
            </a>
            {/* <div className="socials d-flex align-items-cetnter flex-column justify-content-center">
              <YouTube />
              <span className="my-2">
                <Instagram />
              </span>
              <Twitter />
            </div> */}
          </div>
          </main>
        </section>
        <HomeUtilities />

        <SimilarCards
          addToCard
          _products={top_sale_cards && top_sale_cards[active] || []}
          title={
            <span>
              {"پرفروش ترین"} <span className="text-secondary">گیفت </span>{" "}
              کارت ها
            </span>
          }
        >
          <div className="row mb-3 mt-5">
            <div className="col-6 col-md-3">
              <button
                onClick={(e) => setActive("today")}
                className={
                  "btn w-100 " +
                  (active !== "today"
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
        <div className=" d-flex"></div>
        <BrandList
          title={
            <span>
              {"محصولات"} <span className="text-secondary">فروشگاه </span>
            </span>
          }
        />
        <SimilarCards
          _products={popular_cards || []}
          title={
            <span>
              {"محصولات"} <span className="text-secondary">محبوب </span>
            </span>
          }
        />
       
        
      </div>
      <div className="whyus secondary-gradient-90 py-4" style={ config?.website?.orange_background? {background:  config.website.orange_background }: {}}>
        <div className="mcontainer">
          <h3 className="text-center mb-md-0 mb-5">
            <Image src={collapse} /> <b className="mx-2">چرا گیفت استاپ؟</b>{" "}
          </h3>
          <div className="d-flex align-items-stretch justify-content-between flex-wrap">
            <div className="col-12 col-md-5">
              {config&&config.website? 
                Array.from({length: 3}).map((_, item)=>{
                  return <div className="pt-5 pb-4" key={item}>
                    <h4>{config.website["orange_title_"+(item+1)]}</h4>
                    <p className="fw-light">
                      {config.website["orange_text_"+(item+1)]}
                    </p>
                  </div>
                })
              :""}
              
              <Link href="/shop"><a className="btn shadow bg-white d-flex justify-content-between py-3 mt-3">
                جستجوی سریع و خرید کارت
                <ChevronLeft />
              </a></Link>
            </div>

            <div className="col-md-6 col-12 mt-md-0 mt-5 position-relative" >
              <Image src={why} layout="fill" objectFit="contain"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({query}) {
  try{
    const res = await fetch(e.GET_TITLE)
    const data = await res.json()
    return { props: { data } }
  }catch(e){
    return { props: { data:{} } }
  }
}