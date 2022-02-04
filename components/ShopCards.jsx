import React from "react";
import Card from "./Card";
function ShopCards({ cards }) {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="product-list-gift">
            {cards.length
              ? cards.map((i, idx) => {
                  return (
                    <div
                      key={idx}
                      className="col-xl-4 col-sm-6 col-12"
                    >
                      <Card data={i} addToCard showRate />
                    </div>
                  );
                })
              : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCards;
