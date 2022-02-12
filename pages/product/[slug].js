import React from "react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import SimilarCards from "../../components/SimilarCards";
import SendFeedback from "../../components/SendFeedback";
import Reviews from "../../components/Reviews";
import Image from "next/image";
import logos from "../../img/card/logos.png";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { ADD_TO_CART, GET_CARD } from "../../redux/endpoints";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { get_cart } from "../../redux/actions";
function Product() {
  const router = useRouter();
  const pid = router.query.slug;
  const [product, setProduct] = React.useState(undefined);
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(true)   
  // React.useEffect(() => {
  //   const p = cards.filter((i) => i.id === +pid);
  //   if (p) setProduct(p[0]);
  // }, [cards, pid]);


  React.useEffect(()=>{
    axios.get(GET_CARD + pid).then(res=>{

      const {data}  = res
      setProduct(data)
    }).catch(err=>{
      console.log(err)
    })
    .finally(f=>{
      setTimeout(()=>{setLoading(false)}, 1000)
    })

  }, [pid])
  const dispatch = useDispatch()
  const _addToCart = ()=>{
    axios.post(ADD_TO_CART, {
      template_id: product.id,
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
    <div className="container single-product">
      <h1 className="text-center mt-4">
        کارت <span className="text-secondary">انتخابی</span>
      </h1>
      
        <div className="row mt-5 product-list-gift">
        {product ? <>
          <div className="col-12 col-md-4">
            <Card data={product} favoriteAndRate />
          </div>
          <div className="col-12 col-md-8 p-3">
            <h2>{product.name}</h2>
            <div className="row my-4">
              <div className="col-6 col-md-3 mb-2">
                <span className="text-primary  fs-5 d-block">قیمت</span>
                <br />
                <span className="pt-3 mt-3">
                  {product.price}
                  {" تومان"}
                </span>
              </div>
              <div className="col-6 col-md-3 mb-2">
                <span className="text-primary fs-5 d-block">کشور</span>
                <br />
                <span className="pt-3 mt-3">{product.country_id?.name}</span>
              </div>
              <div className="col-6 col-md-3 mb-2">
                <span className="text-primary  fs-5 d-block">دسته بندی</span>
                <br />
                <span className="pt-3 mt-3">{product.brand_id?.persian_name} ({product.brand_id?.name})</span>
              </div>
              <div className="col-6 col-md-3 mb-2">
                <span className="text-primary  fs-5 d-block">امتیاز مشتریان</span>
                <br />
                <span className="pt-3 mt-3">
                  {product.rate} {"("+product.reviews_count+")"}
                </span>
              </div>
            </div>
            <p className="mt-3">{product.description}</p>
            <div className="add-to-card-container d-flex justify-content-between align-items-center">
              <div dir="ltr" className="counter">
                <span onClick={(e) => setCount((c) => (c += 1))}>+</span>
                <span className="border-bottom mx-2 ">{count}</span>
                <span onClick={(e) => setCount((c) => Math.max(1, c - 1))}>
                  -
                </span>
              </div>
              <span className="border rounded p-2">
                {product.price} {" تومان "}{" "}
              </span>
              <button className="success-gradient px-3" onClick={_addToCart}>افزودن به سبد خرید</button>
            </div>
          </div>
          </>
        
       : loading?<section className="w-75 py-5 my-5 d-flex justify-content-center mx-auto"><Bars/></section>:
        <section className="w-75 alert alert-info my-5 mx-auto">محصول یافت نشد</section>
      }</div>

      <SimilarCards
        product={product}
        title={
          <span>
            {"کارتهای"} <span className="text-secondary">مشابه</span>
          </span>
        }
      />
      <div className="my-5">
        <Image src={logos} className="d-none d-md-flex" />
      </div>

      <SendFeedback product={product} />
      <Reviews />

     
    </div>
  );
}

export default Product;
