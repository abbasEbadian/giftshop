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
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { get_cart } from "../redux/actions";
const capit = function (text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

function Card({
  data,
  addToCard = false,
  showRate = false,
  favoriteAndRate = false,
  layered = false,
}) {
  const [count, setCount] = React.useState(1);
  const [newRating, setNewRating] = React.useState(data.rate || 1);

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
  return (
    <div className="single-card px-3">
      <div className="data-container position-relative">
        <Image src={get_image_src(data.brand_id.name)} />
        <Link href={{ pathname: "/product/[slug]", query: { slug: +data.id } }}>
          <a>
            <div className="data position-absolute top-0 text-white w-100 h-100 d-flex flex-column  justify-content-between">
              <div className="d-none align-items-center p-4 px-5 justify-content-between">
                
                {/* <span>{capit(data.brand_id.name)} Card</span> */}
              </div>
              <span dir="ltr" className="price">
                  ${Number(data.real_price).toLocaleString()}
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
            <BookmarkBorderIcon />
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
            <span className="cursor-pointer">امتیاز دهید</span>
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
