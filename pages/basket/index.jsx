import React from "react";
import { useRouter } from "next/router";
import ProductRow from "../../components/ProductRow";

import withAuth from "../../redux/withAuth";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash'
import { toast } from "react-toastify";
import { get_cart } from "../../redux/actions";
import { EMPTY_CART, GET_PAYMENT_LINK } from '../../redux/endpoints'
import axios from "axios";
import PaymentMethod from '../../components/SubBasket/PaymentMethod'
import AlertDialog from '../../components/SubBasket/DeleteConfirmModal'
import Head from 'next/head'
import Discount from '../../components/SubBasket/Discount'

function Basket() {
  const [products, setProducts] = React.useState({})
  const basket = useSelector(s => s.order.basket)
  const [open, setOpen] = React.useState(false);
  const [paymentMethodOpen, setPaymentMethodOpen] = React.useState(false);

  React.useEffect(()=>{
    const x = _.groupBy(basket.orderline_set, c => c.template_id.id)
    setProducts(x)
  }, [basket])
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(get_cart())
  }, [])

  const delete_cart = ()=>{
    axios.delete(EMPTY_CART)
    .then(res=>{
      const {data} = res
      toast(data.message, {
        type: data.type
      })
    }).catch(err=>{
      toast.error("-خطا هنگام انجام عملیات")
      console.log(err);
    })
    .finally(f=>{
      dispatch(get_cart())
    })
  }
 


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
      {basket.orderline_set?.length? <div class="col-12 button-basket py-5  flex-wrap">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <h4>مجموع کل :</h4>
          {basket.discount_code_amount?
            <h5 className="mx-4">
              <del>{_.sumBy(basket.orderline_set, e=>+e.template_id.final_price).toLocaleString()}</del><br/>
              <span className="text-success">{(_.sumBy(basket.orderline_set, e=>+e.template_id.final_price) - basket.discount_code_amount).toLocaleString()}</span>
            </h5> 
          :<h5 className="mx-4">{_.sumBy(basket.orderline_set, e=>+e.template_id.final_price).toLocaleString()}</h5>}
          تومان

        </div>
        <div class="col-6 col-md-3 px-2
        ">
          <div class="accept-pay cursor-pointer">
            
            <a onClick={e=>setPaymentMethodOpen(true)}>تایید و ادامه</a>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="cancel-pay cursor-pointer">
            <a onClick={e=>setOpen(true)}>خالی کردن سبد</a>
          </div>
        </div>
        {basket.discount_id?null:
        <Discount ></Discount>}
      </div>:null}
      
      <AlertDialog onClick={delete_cart} open={open} setOpen={setOpen}/>
      <PaymentMethod open={paymentMethodOpen} setOpen={setPaymentMethodOpen}/>

     
     

    </section>
  );
}

export default withAuth(Basket);
