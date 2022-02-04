import React from "react";
import Image from "next/image";
import VisaCard from "../../img/card/visacard.png";
import ProfileAside from '../../components/ProfileAside'
// import {get_image_name} from '../utils'

function PurchaseReport() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "ویزا کارت 20دلاری",
        price: "2300",
        expire: 1641640564431,
        number: 20,
        type: "paypal",
      },
      {
        id: 2,
        name: "Product 21",
        price: "2200",
        expire: 1641680004431,
        number: 20,
        type: "paypal",
      },
      {
        id: 3,
        name: "Product 21",
        price: "2200",
        expire: 1641680004431,
        number: 20,
        type: "paypal",
      },
    ]);
  }, []);
//   const Router = () => (
//     <BrowserRouter>
//       <div>
//         <Nav>
//           <Link activeClassName='is-active' to='/'>Home</Link> {/* I want this to start off as active */}
//           <Link activeClassName='is-active' to='/about'>About</Link>
//         </Nav>
  
//         <Match pattern='/' exactly component={Home} />
//         <Match pattern='/about' exactly component={About} />
//         <Miss component={NoMatch} />
//       </div>
//     </BrowserRouter>
//   )
  return (
    <>
      <div className="container">
        <div className="row">
          <ProfileAside active="purchase_report"/>
          <div className="col-md-9">
          <h5 class="text-basket py-3">گزارش <span>خریدها</span></h5>
            <div className="all-card-report">
              {products &&
                products.map((item, idx) => {
                  return (
                    <div className="col-12 col-md-5 col-lg-4  card-report">
                      {/* <Image className=" " src={get_image_name(item.type)}></Image> */}
                      <div className="info-card-report1">
                        <div>
                          <p className="fw-bold">{item.name}</p>
                          <p>قیمت : {item.price}$</p>
                        </div>
                        <div>
                          <p className="fw-bold">
                            تاریخ:{" "}
                            {new Date(item.expire).toLocaleDateString("fa-IR")}
                          </p>
                          <p>موجودی : {item.number}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseReport;
