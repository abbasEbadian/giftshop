import React from "react";
import Card from "./Card";
import LoaderButton from "./LoaderButton";
import { toast } from "react-toastify";
import { get_cart} from "../redux/actions";
import {PATCH_CART} from '../redux/endpoints'
import axios from "axios";
import {useDispatch} from 'react-redux'

const locale = (yeGeimat)=>{
    return !isNaN(Number(yeGeimat)) ? Number(yeGeimat).toLocaleString(): yeGeimat
}
function ProductRow({ product , _count}) {
    const [count,setCount] = React.useState(_count)
    
    const [loading, setLoading] = React.useState(false)

    const dispatch = useDispatch()
    const change_count = (template_id, count)=>{
      setLoading(true)
      axios.post(PATCH_CART, {template_id, count})
      .then(res=>{
        const {data} = res
        if (data.error === 0){
          if(data.type === "info"){
            toast.info(data.message)
          }else{
            toast.success("با موفقیت ثبت شد")
          }
          dispatch(get_cart())
        }
        else{
          toast.error("خطا هنگام انجام عملیات")
        }
      }).catch(err=>{
        toast.error("-خطا هنگام انجام عملیات")
        console.log(err);
      })
      .finally(f=>{
        setLoading(false)
      })
    }
  
  return (
    <div className="row mt-5 product-list-gift">
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
              {locale(product.price)}
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
        <p className="mt-3">
         توضیحات: {product.description}
        </p>
        <div className="col-md-6 col-12 d-flex flex-column align-items-end justify-content-center me-auto">
          <div className="add-to-card-container d-flex justify-content-between align-items-center w-100">
            
                <div dir="ltr" className="counter ">
                <span onClick={(e) => setCount((c) => (c += 1))}>+</span>
                <span className="border-bottom mx-2 ">{count}</span>
                <span onClick={(e) => setCount((c) => Math.max(0, c - 1))}>-</span>
              </div>
              <span className="border rounded p-2">
                {locale(product.price)} {" تومان "}{" "}
              </span>

              <LoaderButton text="اصلاح تعداد" className="px-3" loading={loading} onClick={e=>change_count(product.id, count)}/>
          </div>
          <br />
          <div className="calculations mt-4 d-flex align-items-center justify-content-between w-100" dir="ltr">
            
            <div><span>{count}</span> <span className="px-2">x</span> <span>{product.price}</span> <span className="px-2">=</span>  {count * product.price}</div>
            <span className="text-success">مجموع</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRow;
