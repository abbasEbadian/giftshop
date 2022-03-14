import React from "react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import SimilarCards from "../../components/SimilarCards";
import SendFeedback from "../../components/SendFeedback";
import Reviews from "../../components/Reviews";
import LoaderButton from "../../components/LoaderButton";
import Image from "next/image";
import logos from "../../img/card/logos.png";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { ADD_TO_CART, GET_CARD } from "../../redux/endpoints";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { get_cart, update_login_modal } from "../../redux/actions";
import Head from "next/head";
import Link from "next/link";
import Button from "@mui/material/Button";


function Product() {
  const router = useRouter();
  const pid = router.query.slug;
  const [product, setProduct] = React.useState(undefined);
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(true)   
  const [loading1, setLoading1] = React.useState(false)   
  const [similar, setSimilar] = React.useState(true)   
  // React.useEffect(() => {
  //   const p = cards.filter((i) => i.id === +pid);
  //   if (p) setProduct(p[0]);
  // }, [cards, pid]);


  React.useEffect(()=>{
    if(!pid) return
    const pids = pid.split('-')[0]
    axios.get(GET_CARD + pids).then(res=>{

      const {data}  = res
      setProduct(data.card)
      setSimilar(data.similar)
    }).catch(err=>{
      console.log(err)
    })
    .finally(f=>{
      setTimeout(()=>{setLoading(false)}, 1000)
    })

  }, [pid])
  const dispatch = useDispatch()
  const _addToCart = ()=>{
    setLoading1(true)

    axios.post(ADD_TO_CART, {
      template_id: product.id,
      count: count
    }).then(res=>{
      const {data}= res 
      if(data.error === 0)
        dispatch(get_cart())
      else if(data.error === 1 && data.message.indexOf('وارد') > -1){
        dispatch(update_login_modal(true))
      }
      toast(data.message, {type: data.type})
    })
    .catch(e=>{
      console.log(e)
    })
    .finally(e=>{
      setLoading1(false)
    })
  }
  return (
    <div className="container single-product ">
      <Head><title>{product && product.full_name}</title></Head>

      <h1 className="text-center mt-4">
        کارت <span className="text-secondary">انتخابی</span>
      </h1>
        {product&& product.brand_id&&product.brand_id.url?<Link href={product.brand_id.url}>
          <a className="mx-md-5 py-4">
           <Button variant="contained" color="info"> لینک آموزش استفاده</Button>
          </a>
          </Link>:null}
        <div className="row  mt-2 product-list-gift mx-md-5">
          
        {product ? <>
          <div className="col-12 col-lg-4  pt-5 pt-md-0">
            <Card data={product} favoriteAndRate />
          </div>
          <div className="col-12 col-lg-8 p-3">
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
            <div className="add-to-card-container product d-flex justify-content-between align-items-center   me-auto ms-0">
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
              <LoaderButton text="افزودن به سبد خرید" className=" px-3" loading={ loading1} onClick={_addToCart}/>
            </div>
          </div>
          </>
        
       : loading?<section className="w-75 py-5 my-5 d-flex justify-content-center mx-auto"><Bars/></section>:
        <section className="w-75 alert alert-info my-5 mx-auto">محصول یافت نشد</section>
      }</div>

      <SimilarCards
        _products={similar}
        title={
          <span>
            {"کارت های"} <span className="text-secondary">مشابه</span>
          </span>
        }
      />
      <div className="my-5">
        <Image src={logos} className="d-none d-md-flex" />
      </div>

      <div className="card my-4 p-4">
        <div className="col-12 col-lg-8 co-xl-6 mx-auto">
          <SendFeedback product={product} />
        
        <Reviews reviews={product&&product.review_set||[]} />
        </div>
      </div>
     
    </div>
  );
}

export default Product;
