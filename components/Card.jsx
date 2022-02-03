import React from "react";
import visaImage from "../img/card/VisaCard.png";
import visaImageLayered from "../img/card/VisaCard.png";
import appleImage from "../img/card/Apple.png";
import appleImageLayered from "../img/card/Apple.png";
import paypalImage from "../img/card/Pubg.png";
import paypalImageLayered from "../img/card/MasterCard.png";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Rating from "@mui/material/Rating";
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
  const [newRating, setNewRating] = React.useState();

  const get_image_src = (type) => {
    switch (type) {
      case "visa":
        return layered ? visaImageLayered : visaImage;
        break;
      case "apple":
        return layered ? appleImageLayered : appleImage;
        break;
      case "paypal":
        return layered ? paypalImageLayered : paypalImage;
        break;
      default:
        return layered ? visaImageLayered : visaImage;
        break;
    }
  };
  return (
    <div className="single-card">
      <div className="data-container position-relative">
        <Image src={get_image_src(data.category)} />
        <Link href={{ pathname: "/product/[slug]", query: { slug: +data.id } }}>
          <a>
            <div className="data position-absolute p-3 top-0 text-white w-100 h-100 d-flex flex-column  justify-content-between">
              <div className="d-flex align-items-center justify-content-between">
                <span dir="ltr">
                  ${Number(data.realPrice).toLocaleString()}
                </span>
                <span>{capit(data.category)} Card</span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                {showRate ? (
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
          <button className="success-gradient">افزودن به سبد</button>
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
