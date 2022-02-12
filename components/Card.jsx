import React from "react";
import amazon from "../img/card/amazon.png";
import apex from "../img/card/apex.png";
import apple from "../img/card/apple.png";
import applemusic from "../img/card/applemusic.png";
import blizard from "../img/card/blizard.png";
import gold from "../img/card/gold.png";
import googleplay from "../img/card/googleplay.png";
import leagueoflegends from "../img/card/leagueoflegends.png";
import mastercard from "../img/card/mastercard.png";
import netflix from "../img/card/netflix.png";
import nintendo from "../img/card/nintendo.png";
import paypal from "../img/card/paypal.png";
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
import { get_cart ,profile} from "../redux/actions";

import {ADD_TO_CART, TOGGLE_FAVORITES} from '../redux/endpoints'
import { Typography } from "@mui/material";



function Card({
  data,
  addToCard = false,
  showRate = false,
  favoriteAndRate = false,
  layered = false,
}) {
  const [count, setCount] = React.useState(1);
  const [newRating, setNewRating] = React.useState(data.rate || 1);
  const user = useSelector(s=>s.auth.user)

  const get_image_src = (type) => {
    switch (type) {
      case "visacard": return layered ? visaImageLayered : visacard;
      case "apple": return layered ? appleImageLayered : apple;
      case "applemusic": return  applemusic;
      case "paypal": return layered ? paypalImageLayered : paypal;
      case "mastercard": return layered ? paypalImageLayered : mastercard;
      case "amazon": return  amazon;
      case "apex": return  apex;
      case "leagueoflegends": return  leagueoflegends;
      case "blizard": return  blizard;
      case "gold": return  gold;
      case "googleplay": return  googleplay;
      case "netflix": return  netflix;
      case "nintendo": return  nintendo;
      case "playstation": return  playstation;
      case "pubg": return  pubg;
      case "roblex": return  roblex;
      case "skype": return  skype;
      case "spotify": return  spotify;
      case "steam": return  steam;
      case "warcraft": return  warcraft;
      case "xbox": return  xbox;
      default:
        return layered ? visaImageLayered : visacard;
    }
  };
  const get_flag_src = (type)=>{
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
    
      default:
        return IR;
    }
  } 
  const dispatch = useDispatch()
  const _addToCart = ()=>{
    axios.post(ADD_TO_CART, {
      template_id: data.id,
      count: count
    }).then(res=>{
      const {data}= res 
      toast.success("با موفقیت افزوده شد.")
      dispatch(get_cart())
    })
    .catch(e=>{
      console.log(e)
    })
  }
  const toggleFavorite = ()=>{
    axios.post(TOGGLE_FAVORITES, {template_id: data.id})
    .then(res=>{
      const {data} = res
      if(data.error === 0){
        toast.success("با موفقیت ثبت شد")
      }else{
        toast.error("خطا هنگام ثبت")
      }
    }).catch(err=>{
      toast.error("خطا در برقراری ارتباط")
    })
    .finally(f=>dispatch(profile()))
  }
  return (
    <div className="single-card px-3">
      <div className="data-container position-relative">
        <Image src={get_image_src(data.brand_id.name)} />

        

        <Link href={{ pathname: "/product/[slug]", query: { slug: +data.id } }}>
          <a>
            <div className="data position-absolute top-0 text-white w-100 h-100 d-flex flex-column  justify-content-between">
            <div className="flag-cont">
              {/* <Image className="flag" src={get_flag_src(data.country_id.symbol)} width={90} height={20} /> */}
              </div>
              <span dir="ltr" className="price text-center">
                  ${Number(data.real_price).toLocaleString()}
                  <Typography sx={{fontSize: "10px"}}>{data.country_id.symbol}</Typography>
                </span>
              <div className="d-flex align-items-center justify-content-between">
                {showRate && false ? (
                  <span>
                    {data.rate} <StarIcon />
                  </span>
                ) : (
                  <i></i>
                )}
                <span>
                  {/* {data.price} {" تومان "}{" "} */}
                </span>
                <span></span>
              </div>
            </div>
          </a>
        </Link>
      </div>
      {addToCard ? (
        <div className="add-to-card-container d-flex justify-content-between align-items-center">
          <div dir="ltr" className="counter">
            <span onClick={(e) => setCount((c) => (c += 1))}>+</span>
            <span className="border-bottom mx-2 ">{count}</span>
            <span onClick={(e) => setCount((c) => Math.max(1, c - 1))}>-</span>
          </div>
          <span>
            {Number(data.price).toLocaleString()} {" تومان "}{" "}
          </span>
          <button className="success-gradient" onClick={_addToCart}>افزودن به سبد</button>
        </div>
      ) : undefined}
      {favoriteAndRate ? (
        <>
          <div className="d-flex align-items-center justify-content-evenly mt-3">
            <span className="cursor-pointer">
              افزودن به کارت های مورد علاقه
            </span>
            <span onClick={toggleFavorite}>
              {user && user.favorite_set && user.favorite_set.filter(i=>i.template_id.id === data.id) && user.favorite_set.filter(i=>i.template_id.id === data.id).length? 
                <BookmarkAddedIcon color={"success"}/>
                :
                <BookmarkBorderIcon />
              }
            </span>
          </div>
          <div
            className="d-flex align-items-center justify-content-evenly mt-3"
            dir="ltr"
          >
            <Rating
              className="star-color"
              name="simple-controlled"
              value={newRating}
              onChange={(event, newValue) => {
                setNewRating(newValue);
              }}
              readOnly
            />
            {/* <span className="cursor-pointer">امتیاز دهید</span> */}
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
