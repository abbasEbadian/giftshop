import React from "react";
import VisaCard from "../../img/card/visacard.png";
import ProfileAside from "../../components/ProfileAside";
import withAuth from "../../redux/withAuth";
import Head from "next/head";

function Products() {
  return (
    <>
            <Head><title>حساب کاربری| گیفت شاپ</title></Head>

      <div className="container">
        <div className="row">
          <div className="col-md-3" >
            <ProfileAside active="purchase_report" />
          </div>
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

export default withAuth(Products);