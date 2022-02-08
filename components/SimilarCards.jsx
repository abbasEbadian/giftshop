import React from "react";
import { Navigation } from "swiper";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { cards } from "../data";
import Card from "./Card";
import "swiper/css/navigation";
import "swiper/css";
function SimilarCards({ children, product, title, addToCard = false }) {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    if (product)
      setProducts(
        cards.filter((i) => Math.abs(i.realPrice - product.realPrice) < 500)
      );
    else setProducts(cards.filter((i, x) => i.id < 10));
  }, [cards, product]);

  return (
    <div>
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
          700: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 4,
          },
          1600: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((i) => {
          return (
            <SwiperSlide key={i.id}>
              <Card data={i} layered addToCard={addToCard} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SimilarCards;
