import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {cards} from '../data'
import Card from './Card'
function SimilarCards({children, product, title, addToCard=false}) {
    const [products, setProducts] = React.useState([])
    React.useEffect(() => {
        if(product) setProducts(cards.filter(i=>Math.abs(i.realPrice - product.realPrice) < 500))
        else setProducts(cards.filter((i, x)=>i.id<10))
    }, [cards, product]);

    return <div>
        <h1 className="text-center mt-5 mb-4">{title}</h1>
        {children}
        <Swiper
        spaceBetween={20}
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
                <Card data={i} layered addToCard={addToCard}/>
            </SwiperSlide>
        })}
        

        </Swiper>
    </div>;
}

export default SimilarCards;
