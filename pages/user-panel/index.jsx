import React from "react";
import VisaCard from "../../img/card/visacard.png";
import ProfileAside from "../../components/ProfileAside";

function Products() {
  return (
    <>
      <div className="container">
        <div className="row">
          <ProfileAside active="purchase_report" />
          <div className="col-md-9">
            <h5 class="text-basket py-3">
              گزارش <span>خریدها</span>
            </h5>
            <div className="all-card-report">
              {/* {products &&
                products.map((item, idx) => {
                  return (
                   
                  );
                })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;