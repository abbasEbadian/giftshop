import React from "react";
import { Navigation } from "swiper";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { cards } from "../data";
import Card from "./Card";
import "swiper/css/navigation";
import "swiper/css";
function SimilarCards({ _products=[], children, product=undefined, title, addToCard = false }) {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    if (product)
      setProducts(
        cards.filter((i) => Math.abs(i.realPrice - product.realPrice) < 500)
      );
    else if(_products) setProducts(_products)
    else setProducts(cards.filter((i, x) => i.id < 10));
  }, [product, _products]);

  return (
    <div className={"" + (addToCard? "with-button": "")}>
      <h2 className="text-center mt-5 mb-4">{title}</h2>
      {children}
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={4}
        modules={[Navigation]}
        navigation
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          450:{
            slidesPerView: 2,
          },
          790: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
          1600: {
            slidesPerView: 5,
          },
        }}
      >
        {products&&typeof products ==="object"? products.map((i) => {
          return (
            <SwiperSlide key={i.id}>
              <Card data={i} layered addToCard={addToCard} />
            </SwiperSlide>
          );
        }):null}
      </Swiper>
    </div>
  );
}

export default SimilarCards;
