import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {cards} from '../data'
import Card from './Card'
function SimilarCards({product}) {
    const [products, setProducts] = React.useState([])

    React.useEffect(() => {
        if(product) setProducts(cards.filter(i=>Math.abs(i.realPrice - product.realPrice) < 500))
    }, [cards, product]);

    return <div>
        <h1 className="text-center mt-5 mb-4">کارتهای {" "}<span className="text-danger">مشابه</span></h1>

        <Swiper
        spaceBetween={50}
        slidesPerView={4}
        breakpoints={{
            360:{
                slidesPerView: 1.4
            },
            576:{
                slidesPerView: 2.4,
            },
            992:{
                slidesPerView: 3.4,
            },
            1200:{
                slidesPerView: 4,
            }
        }}
        >
        {products.map(i=>{
            return <SwiperSlide key={i.id}>
                <Card data={i} layered/>
            </SwiperSlide>
        })}
        

        </Swiper>
    </div>;
}

export default SimilarCards;
