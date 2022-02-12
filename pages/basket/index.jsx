import React from "react";
import { useRouter } from "next/router";
import ProductRow from "../../components/ProductRow";

import withAuth from "../../redux/withAuth";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash'
import { toast } from "react-toastify";
import { get_cart} from "../../redux/actions";
import {PATCH_CART} from '../../redux/endpoints'
import axios from "axios";

import Head from 'next/head'
function Basket({setBasket}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState({})
  const basket = useSelector(s=>s.order.basket)
  
  React.useEffect(()=>{
    const x = _.groupBy(basket.orderline_set, c => c.template_id.id)
    setProducts(x)
  }, [basket])




  return (
    <section className="container pb-5">
      <Head><title>سبد خرید | گیفت شاپ</title></Head>
      <h1 className="text-center mt-4">
        کارت های <span className="text-secondary">انتخابی</span>
      </h1>
      {Object.keys(products)?.length?
        Object.keys(products).map(product=>{
          return  <ProductRow product={products[product][0].template_id} _count={products[product].length}  />
        }): <>
        
       <section className="alert alert-info w-75 my-5 mx-auto">سبد خرید شما خالیست</section>
        </>
      }

     
     

    </section>
  );
}

export default withAuth(Basket);
