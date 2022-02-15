import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";

function SendTicket(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [RelevantProduct, setRelevantProduct] = React.useState({
    product1: "لینک محصول گیفت کارت اپل",
    product2: "لینک محصول گیفت کارت اپل موزیک",
    product3: "لینک محصول گیفت کارت اپکس",
    product4: "لینک محصول گیفت کارت امازون",
  })

  return (
    <section className="container">
      <Head><title>گیفت استاپ | ارسال تیکت</title></Head>

      <div className="row">
        <ProfileAside active="new_ticket" />
        <div className=" col-lg-9 col-12 py-5">
          <h5 class="text-basket pb-3 m-0">
            ارسال <span>تیکت</span>
          </h5>
          <form action="#" method="post">
            <div className="d-flex justify-content-between flex-wrap px-5 send-ticket">
              <div className="col-md-5 col-lg-5 col-12 pb-4">
                <label htmlFor="">موضوع تیکت</label>
                <input type="text" className="form-control" placeholder="موضوع پیام خود را وارد کنید" />
              </div>
              <div className="col-md-5 col-lg-5 col-12 pb-4">
                <label htmlFor="">دپارتمان مربوطه *</label>
                <Form.Select aria-label="Default select example">
                  <option>--انتخاب کنید--</option>
                  <option value="1">حسابداری</option>
                  <option value="2">مالی</option>
                  <option value="3">پشتیبانی</option>
                </Form.Select>
              </div>
              <div className="col-md-5 col-lg-5 col-12">
                <label htmlFor="">اولویت *</label>
                <Form.Select aria-label="Default select example">
                  <option>--انتخاب کنید--</option>
                  <option value="1">کم</option>
                  <option value="2">متوسط</option>
                  <option value="3">زیاد</option>
                </Form.Select>
              </div>
              <div className="col-md-5 col-lg-5 col-12">
                <label htmlFor="">محصول مربوطه</label>
                <Form.Select aria-label="Default select example">
                  <option>--انتخاب کنید--</option>
                  <option value="1">{RelevantProduct.product1}</option>
                  <option value="2">{RelevantProduct.product2}</option>
                  <option value="3">{RelevantProduct.product3}</option>
                  <option value="3">{RelevantProduct.product4}</option>
                </Form.Select>
              </div>
              <div className="col-12 py-4">
                <label htmlFor="">متن پیام شما *</label>
                <textarea className="form-control" name="" id="" cols="30" rows="10"></textarea>
              </div>
              <div className="col-12 text-center pb-4">
                <Link href="">
                  <a className="btn success-gradient px-5">
                    ارسال تیکت
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default SendTicket;