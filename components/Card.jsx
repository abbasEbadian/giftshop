import React from "react";
import amazon from "../img/card/amazon.png";
import apex from "../img/card/apex.png";
import apple from "../img/card/apple.png";
import applemusic from "../img/card/applemusic.png";
import blizard from "../img/card/blizard.png";
import razergold from "../img/card/razergold.png";
import googleplay from "../img/card/googleplay.png";
import leagueoflegends from "../img/card/leagueoflegends.png";
import mastercard from "../img/card/mastercard.png";
import netflix from "../img/card/netflix.png";
import nintendo from "../img/card/nintendo.png";
// import paypal from "../img/card/paypal.png";
import playstation from "../img/card/playstation.png";
import pubg from "../img/card/pubg.png";
import roblex from "../img/card/roblex.png";
import skype from "../img/card/skype.png";
import spotify from "../img/card/spotify.png";
import steam from "../img/card/steam.png";
import visacard from "../img/card/visacard.png";
import warcraft from "../img/card/warcraft.png";
import xbox from "../img/card/xbox.png";
import visaImageLayered from "../img/card/visacard.png";
import appleImageLayered from "../img/card/apple.png";
import paypalImageLayered from "../img/card/mastercard.png";


import USA from '../img/flags/USA.webp'
import UAE from '../img/flags/UAE.webp'
import RUSSIA from '../img/flags/RUSSIA.webp'
import EUROPE from '../img/flags/EUROPE.webp'
import ENGLAND from '../img/flags/ENGLAND.webp'
import CHINA from '../img/flags/CHINA.webp'
import CANADA from '../img/flags/CANADA.webp'
import BRAZIL from '../img/flags/BRAZIL.webp'
import ARS from '../img/flags/ARS.webp'
import IR from '../img/flags/ir.webp'
import GLOBAL from '../img/flags/GLOBAL.webp'
import TURKEY from '../img/flags/TURKEY.webp'



import Image from "next/image";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { configs, get_cart, profile, update_login_modal } from "../redux/actions";

import { ADD_TO_CART, TOGGLE_FAVORITES } from '../redux/endpoints'
import { Button, Typography } from "@mui/material";
import LoaderButton from "./LoaderButton";
import { ProductionQuantityLimits } from "@mui/icons-material";
import { BASE_URL } from "../redux/types";


function Card({
  data,
  addToCard = false,
  showRate = false,
  favoriteAndRate = false,
  layered = false,
  ratable = false,
  hidePrice = false
}) {
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [newRating, setNewRating] = React.useState(data.rate || 1);
  const user = useSelector(s => s.auth.user)
  const config = useSelector(s=>s.main.configs)

  const get_image_src = (type) => {
    switch (type) {
      case "visacard": return layered ? visaImageLayered : visacard;
      case "apple": return layered ? appleImageLayered : apple;
      case "applemusic": return applemusic;
      // case "paypal": return layered ? paypalImageLayered : paypal;
      case "mastercard": return layered ? paypalImageLayered : mastercard;
      case "amazon": return amazon;
      case "apex": return apex;
      case "leagueoflegends": return leagueoflegends;
      case "blizard": return blizard;
      case "razergold": return razergold;
      case "googleplay": return googleplay;
      case "netflix": return netflix;
      case "nintendo": return nintendo;
      case "playstation": return playstation;
      case "pubg": return pubg;
      case "roblex": return roblex;
      case "skype": return skype;
      case "spotify": return spotify;
      case "steam": return steam;
      case "warcraft": return warcraft;
      case "xbox": return xbox;
      default:
        return layered ? visaImageLayered : visacard;
    }
  };
  const get_flag_src = (type) => {
    switch (type) {
      case "USA":
        return USA;
      case "UAE":
        return UAE;
      case "RUSSIA":
        return RUSSIA;
      case "EUROPE":
        return EUROPE;
      case "ENGLAND":
        return ENGLAND;
      case "CHINA":
        return CHINA;
      case "CANADA":
        return CANADA;
      case "BRAZIL":
        return BRAZIL;
      case "ARS":
        return ARS;
      case "TURKEY":
        return TURKEY;
      case "GLOBAL":
        return GLOBAL;

      default:
        return GLOBAL;
    }
  }
  const dispatch = useDispatch()
  const _addToCart = () => {
    setLoading(true)
    axios.post(ADD_TO_CART, {
      template_id: data.id,
      count: count
    }).then(res => {
      const { data } = res

      if (data.error === 0)
        dispatch(get_cart())
      else if (data.error === 1 && data.message.indexOf('وارد') > -1) {
        dispatch(update_login_modal(true))
      }
      toast(data.message, { type: data.type })

    })
      .catch(e => {
        console.log(e)
      })
      .finally(e => {
        setLoading(false)
      })
  }
  const toggleFavorite = () => {
    axios.post(TOGGLE_FAVORITES, { template_id: data.id })
      .then(res => {
        const { data } = res
        if (data.error === 0) {
          toast.success("با موفقیت ثبت شد")
        } else {
          toast.error("خطا هنگام ثبت")
        }
      }).catch(err => {
        toast.error("خطا در برقراری ارتباط")
      })
      .finally(f => dispatch(profile()))
  }
  const gen_path = (data) => {
    return data.id + "-" + data.full_name.replaceAll(' ', '-')
  }
  return (
    <div className="single-card px-3  ">

      <div className="data-container position-relative">
        {data.offcard_set && data.offcard_set.length > 0 ?
          <span className="special-offer">پیشنهاد ویژه</span>
          : null}
        <Image src={data?.image ? (BASE_URL + data.image) : get_image_src(data.brand_id?.name)} alt={(data && data.image_alt) ?? "گیفت کارت"} layout="fill" />

        <Link href={
          {
            pathname: !hidePrice ? "/product/[slug]" : "/shop/[slug]", query: { slug: !hidePrice ? (gen_path(data)) : data.brand_id?.name }
          }}>
          <a>
            <div className="data position-absolute top-0 text-white w-100 h-100 d-flex flex-column  justify-content-between">
              {!hidePrice && (data.real_price > 0 || data.country_id) ?
                <span dir="ltr" className="price text-center">
                  {data.real_price > 0 &&
                    <span>{data.country_id?.currency_id?.symbol ?? "$"} {Number(data.real_price).toLocaleString('fa')}</span>
                  }
                  {data.country_id && <div className="flag-cont">
                    <Image className="flag" src={get_flag_src(data.country_id.symbol)} width={30} height={20} />
                  </div>}

                </span>
                : null
              }
            </div>
            {showRate ? (
              <span className="d-flex align-items-center _rate position-absolute ">
                <Typography component="h2" sx={{ transform: "translateY(1px)", fontSize: "15px", fontWeight: "900" }}> {Number(data.rate)} </Typography><StarIcon />
              </span>
            ) : (
              <i></i>
            )}
          </a>
        </Link>
      </div>
      {hidePrice && !addToCard ?
        <h2 className="w-100 text-center">
          <Typography component="h2" sx={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}>
            <span className="">گیفت کارت </span> {" "} {Number(data.real_price).toLocaleString('fa')}  {" "}  {data.country_id?.currency_id?.persian_name}  {" "} {data.brand_id?.persian_name}
          </Typography>
        </h2>
        : null}
      {addToCard ? <>
        <h5 className="w-100 d-flex  justify-content-between px-2">
          <Typography component="h2" sx={{ fontSize: "12px" }}>
            <span>
              {data.full_name_trimmed}
            </span>
            {data.date > 0 ? <>
              <br></br>
              <small> <span className="text-danger">{data.date_text} </span></small>
            </> : null}
          </Typography>
          { (!data.no_sell && !data.ask_me) && <Typography component="span" sx={{ fontSize: "14px" }} className="test">
            {data.offcard_set && data.offcard_set.length > 0 ? <>
              <del>
                {Number(data.price).toLocaleString('fa')} {" ت "}{" "}
              </del><br />
              <span className="special-offer-price text-success">{Number(Number(data.price) / 100 * (100 - data.offcard_set[0].amount)).toLocaleString('fa')}</span> {" ت "}
            </>
              : <><span className="text-nowrap">
                {(Number(data.price)).toLocaleString('fa')} {" ت "}{" "}</span><br />
                <span className="special-offer-price text-success"></span>
              </>}

          </Typography>}
        </h5>
        <div className="add-to-card-container d-flex justify-content-between align-items-center">
          {data?.no_sell ?<Button  color='error' variant="outlined" className="exclude" fullWidth>ناموجود</Button>:
            data?.ask_me ?<Link href={config?.contactus?.whatsapp_link || "#"}><a className="text-primary w-100"><Button  color='info' variant="outlined" className="exclude" fullWidth>استعلام موجودی</Button></a></Link>:
            <>
              <div dir="ltr" className="counter">
                <span onClick={(e) => setCount((c) => (c += 1))}>+</span>
                <span className="border-bottom mx-2 ">{count}</span>
                <span onClick={(e) => setCount((c) => Math.max(1, c - 1))}>-</span>
              </div>


              <LoaderButton text={"افزودن به سبد"} loading={loading} onClick={_addToCart} />
            </>}

        </div>
      </> : undefined}
      {favoriteAndRate ? (
        <>
          <div className="d-flex align-items-center justify-content-evenly mt-3">
            <span className="cursor-pointer">
              افزودن به کارت های مورد علاقه
            </span>
            <span onClick={toggleFavorite} className="cursor-pointer">
              {user && user.favorite_set && user.favorite_set.filter(i => i.template_id.id === data.id) && user.favorite_set.filter(i => i.template_id.id === data.id).length ?
                <BookmarkAddedIcon color={"success"} witdh={30} height={30} />
                :
                <BookmarkBorderIcon />
              }
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string,
  price: PropTypes.number,
  rate: PropTypes.number,
  realPrice: PropTypes.number,
};
export default Card;
