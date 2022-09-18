import React from "react";
import Card from "./Card";
import { TailSpin } from 'react-loader-spinner'
function ShopCards({ cards, loading = false }) {
  const points = (d) => {
    if (d.brand_id?.name === 'apple') return 0
    return 1
  }
  return (
        <div className="product-list-gift d-flex flex-wrap  mt-5 mt-lg-0">
          {cards.length ? cards.sort((a, b) => points(a) - points(b)).map((i, idx) => {
            return (
              <div
                key={idx}
                className="card-container col-xxl-3 col-lg-4 col-md-6  col-12"
              >
                <Card data={i} addToCard showRate />
              </div>
            );
          })
            : <div className="d-grid place-items-center w-100">
              {!loading ?
                <div className="alert alert-info mb-0">
                  {"کارتی برای نمایش وجود ندارد"}
                </div>
                : <div className="d-flex align-items-end">
                  <TailSpin width={40} height={30} color={"#39ACF1"} />
                  <span className="mx-4">در حال دریافت گیفت کارت ها</span>
                </div>}

            </div>}
        </div>
  );
}

export default ShopCards;
