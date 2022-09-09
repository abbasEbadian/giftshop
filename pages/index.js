import  { useEffect, useState} from "react";
import Head from "next/head";
import card from "../img/other/Card.png";
import Image from "next/future/image";import mouse from "../img/icon/Mouse-alt.png";
import arrows from "../img/icon/Arrows.svg";
import dynamic  from "next/dynamic";

import { useDispatch, useSelector } from 'react-redux'
import {
  ChevronLeft,
} from "@mui/icons-material";

const SimilarCards = dynamic( () => import("../components/SimilarCards")) 
const HomeUtilities = dynamic( () => import("../components/subHome/HomeUtilities")) 
const HomeWhyUs = dynamic( () => import("../components/subHome/HomeWhyUs")) 
const BrandList = dynamic( () => import("../components/BrandList")) 

import Link from "next/link";
import intro from '../img/icon/giftstop-01.png'
import { fetch_popular_cards, fetch_top_sale_cards } from "../redux/actions";

export default function Home() {
  const [active, setActive] = useState("today");
  const popular_cards = useSelector(s => s.main.popular_cards)
  const top_sale_cards = useSelector(s => s.main.top_sale_cards)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetch_popular_cards())
    dispatch(fetch_top_sale_cards())
  }, [])

  return (

    <>
      <div className="mcontainer mcontainer-bg pb-5">
        <Head>
          <title>{"گیفت استاپ: مرجع فروش گیفت کارت در ایران با گارانتی معتبر"}</title>
          <meta name="description" content={"گیفت استاپ برای خرید گیفت کارت ارزان ، خرید گیفت کارت اپل آیتونز ، گوگل پلی ، استیم والت ، آمازون ، ایکس باکس، ریزر گلد،گیم پس،نینتندو،نتفلیکس،روبلاکس، پلی استیشن ps4 و مستر کارت ارزان و با تحویل آنی و پشتیبانی 24 ساعته"} />
          <meta name="keywords" content={"گیفت کارت,خرید گیفت کارت,گیفت کارت استور,گیفت کارت ارزان,گیف کارت,خرید گیفت کارت ارزان,فروش گیفت کارت,قیمت گیفت کارت"} />
          <link rel="icon" href="/fav.png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        </Head>
        <section id="bg-header-new">
          <main className="main-page flex-wrap">
            <div className="content1 d-flex flex-column justify-content-center col-12 col-md-4 pe-lg-5 p-0">
              <h3 className="fs-2 ">
                گیفت <Image style={{maxWidth: "100%", height: 'auto'}} src={card} width={36} height={24} alt="گیفت کارت" /> کارت های متنوع
              </h3>
              <h3 className="fs-3 mt-3 mb-5 text-nowrap">
                خرید <span className="text-secondary">سریع</span> {" و "}
                <span className="text-secondary">آسان</span> {" و "}
                همراه با <span className="text-secondary">امنیت بالا</span>
              </h3>
              <p className="text-justify">
                <span>
                  انواع مختلف
                  {" "}<h1 className="d-inline" style={{ fontSize: "1rem"}}> <b>گیفت‌ کارت</b></h1> با نازل‌ترین قیمت‌ها، قابل استفاده در
                  پلتفرم‌ها و سایت‌های گوناگون. جهت خریدهای آنلاین، خرید اکانت‌های
                  ویژه ، پریمیوم، سهولت و کاهش هزینه‌ها در شارژ حساب‌های کاربری
                  (پلی‌استیشن، آی‌تونز، گوگل‌پلی، اسپاتیفای،...) و کاربردهای دیگر
                </span>
              </p>
              <button className="btn success-gradient d-flex justify-content-between  align-items-center mt-3">
                <Link href="/shop ">
                  <a className="text-white py-3 w-75 text-end">جستجوی سریع و خرید کارت</a>
                </Link>
                <ChevronLeft />
              </button>
            </div>
            <div className="col-md-2 col-0"></div>
            <div className="images col-md-6 col-12" >
              <Image style={{maxWidth: "100%", height: 'auto'}} src={intro}  alt="خرید انواع گیفت کارت" loading="eager"/>
            </div>

            <div className="col-12 footing d-flex align-items-end justify-content-center mt-auto pb-2">
              <span></span>
              <a href="#scroll-here" className="scroll-down d-flex align-items-center justify-content-center flex-column bg-transparent">
                <span className="mb-2">
                  <Image style={{maxWidth: "100%", height: 'auto'}} src={mouse} alt="mouse" />
                </span>
                <Image style={{maxWidth: "100%", height: 'auto'}} src={arrows} alt="arrows" />
              </a>

            </div>
          </main>
        </section>
        <HomeUtilities />
        <i id="scroll-here"></i>
        <SimilarCards
          addToCard
          _products={top_sale_cards && top_sale_cards[active] || []}
          title={
            <span >
              {"پرفروش ترین"} <span className="text-secondary">گیفت </span>{" "}
              کارت ها
            </span>
          }
        >
          <div className="row mb-3 mt-5" >
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
      <HomeWhyUs />
    </>
  );
}
