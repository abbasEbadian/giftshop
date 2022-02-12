import React from "react";
import Card from "./Card";

const locale = (yeGeimat)=>{
    return !isNaN(Number(yeGeimat)) ? Number(yeGeimat).toLocaleString(): yeGeimat
}
function ProductRow({ product , _count, change_count}) {
    const [count,setCount] = React.useState(_count)
    

    
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
            <span className="pt-3 mt-3">{product.country}</span>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <span className="text-primary  fs-5 d-block">دسته بندی</span>
            <br />
            <span className="pt-3 mt-3">{product.category}</span>
          </div>
          <div className="col-6 col-md-3 mb-2">
            <span className="text-primary  fs-5 d-block">امتیاز مشتریان</span>
            <br />
            <span className="pt-3 mt-3">
              {product.rate} {"(6)"}
            </span>
          </div>
        </div>
        <p className="mt-3">
         توضیحات: {product.description}
        </p>
        <div className="add-to-card-container d-flex justify-content-between align-items-center">
          <div dir="ltr" className="counter">
            <span onClick={(e) => setCount((c) => (c += 1))}>+</span>
            <span className="border-bottom mx-2 ">{count}</span>
            <span onClick={(e) => setCount((c) => Math.max(0, c - 1))}>-</span>
          </div>
          <span className="border rounded p-2">
            {locale(product.price)} {" تومان "}{" "}
          </span>
          <button className="success-gradient px-3" onClick={e=>change_count(product.id, count)}>اصلاح تعداد</button>
        </div>
      </div>
    </div>
  );
}

export default ProductRow;
