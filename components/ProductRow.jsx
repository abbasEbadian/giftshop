import React from "react";
import Card from "./Card";
import LoaderButton from "./LoaderButton";
import { toast } from "react-toastify";
import { get_cart} from "../redux/actions";
import {PATCH_CART} from '../redux/endpoints'
import axios from "axios";
import {useDispatch} from 'react-redux'
import * as _ from 'lodash'
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";

const locale = (yeGeimat)=>{
    return !isNaN(Number(yeGeimat)) ? Number(yeGeimat).toLocaleString('fa'): yeGeimat
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
  const _remove_item= (p)=>{
    change_count(p, 0)
  }
  const increaseCount = (e)=>{
    if(loading) return
    change_count(product.id, _count +1)
  }
  const decreaseCount = (e)=>{
    if(loading) return
    change_count(product.id, _count -1 )
    
  }
  return (
    <div className="d-flex flex-wrap p-2 mt-5 product-list-gift basket-remove-item-parent position-relative">
      <Box className="basket-remove-item text-start mt-2 position-absolute top-0 start-0 " sx={{zIndex: 2, pl: "12px", pt:"6px"}}>
        <CloseIcon onClick={e=>_remove_item(product.id)} color="error" className="cursor-pointer"/>
      </Box>
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
       
        <div className="col-md-8 col-12 d-flex flex-column align-items-end justify-content-center me-auto">
          <div className="add-to-card-container d-flex justify-content-end align-items-center w-100">
            
                <div dir="ltr" className="counter mx-5">
                <span onClick={increaseCount}>+</span>
                <span className="border-bottom mx-2 ">{_count}</span>
                <span onClick={decreaseCount}>-</span>
              </div>
              <span className="border rounded p-2">
                {locale(product.price)} {" تومان "}{" "}
              </span>

              {/* <LoaderButton text="اصلاح تعداد" className="px-3" loading={loading} onClick={e=>change_count(product.id, _count)}/> */}
          </div>
          <br />
          
          {product.dicsount > 0?<div className="calculations mt-4 d-flex align-items-center justify-content-start w-100 border-bottom pb-3" dir="ltr">
            
            <div><span>{_count}</span> <span className="px-2">x</span> <span>{product.dicsount}</span> <span className="px-2">=</span>  {_count * product.dicsount}</div>
            <span className="text-danger ms-4">: تخفیف  </span>
          </div>:null}
          {product.dicsount > 0?<div className="calculations mt-3 d-flex align-items-center justify-content-start w-100" dir="ltr">
            
            <div><span>{locale(_count * product.price)}</span> <span className="px-2">-</span> <span>{_count * product.dicsount}</span> <span className="px-2">=</span>  {_count * product.final_price}</div>
            <span className="text-success ms-4">: مجموع  </span>
          </div>:
            <div className="calculations mt-4 d-flex align-items-center justify-content-start w-100" dir="ltr">
            <div><span>{locale(_count)}</span> <span className="px-2">x</span> <span>{locale(product.price)}</span> <span className="px-2">=</span>  {locale(_count * product.price)}</div>
            <span className="text-success ms-4">: مجموع  </span>
          </div>
          }
        </div> 
      </div>
    </div>
  );
}

export default ProductRow;
