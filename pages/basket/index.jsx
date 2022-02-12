import React from "react";
import { useRouter } from "next/router";
import ProductRow from "../../components/ProductRow";

import withAuth from "../../redux/withAuth";
import { useSelector } from "react-redux";
function Basket({setBasket}) {
  const router = useRouter();

  const basket = useSelector(s=>s.order.basket)
  return (
    <div className="container single-product">
      <h1 className="text-center mt-4">
        کارت های <span className="text-secondary">انتخابی</span>
      </h1>
      {basket&&basket.orderline_set&&basket.orderline_set.length?
        basket.orderline_set.map(product=>{
          console.log(product)
          return  <ProductRow product={product} />
        }): <>
        
       <section className="alert alert-info w-75 my-5 mx-auto">سبد خرید شما خالیست</section>
        </>
      }

     
     

    </div>
  );
}

export default withAuth(Basket);
