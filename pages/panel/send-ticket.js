import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SEND_TICKET } from "../../redux/endpoints";
import { profile } from "../../redux/actions";
import Button from '@mui/material/Button'
import {toast} from 'react-toastify'
function SendTicket(props) {
  const router = useRouter()
  const [age, setAge] = React.useState('');
  const user = useSelector(s=>s.auth.user)
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [order_id, setorder_id] = React.useState(0)  
  const [section, setsection] = React.useState(0)
  const [title, settitle] = React.useState("")
  const [content, setcontent] = React.useState("")
  const [priority, setpriority] = React.useState(0)

  const dispatch = useDispatch()
  const _send = ()=>{
    axios.post(SEND_TICKET, {
      order_id ,
      section,
      title,
      content,
      priority,
    })
    .then(response =>{
      const {data} =response
      if(data.error === 0){
        dispatch(profile())
        toast.success(data.message)
        router.push("ticket-list")
      }else{
        toast.error(data.message)
      }
    })
    .catch(err=>{
      toast.error("خطا در برقراری با  سرور ")
      console.log(err)
    })
  }
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
                <label htmlFor="">موضوع تیکت*</label>
                <input type="text" className="form-control" placeholder="موضوع پیام خود را وارد کنید" value={title} onChange={e=>settitle(e.target.value)} />
              </div>
              <div className="col-md-5 col-lg-5 col-12 pb-4">
                <label htmlFor="">دپارتمان مربوطه </label>
                <Form.Select aria-label="Default select example" value={section} onChange={e=>setsection(e.target.value)}>
                  <option value={0}>--انتخاب کنید--</option>
                  <option value="حسابداری">
                    حسابداری</option>
                  <option value="مالی">
                    مالی </option>
                  <option value="پشتیبانی">
                  پشتیبانی</option>

                </Form.Select>
              </div>
              <div className="col-md-5 col-lg-5 col-12">
                <label htmlFor="">اولویت *</label>
                <Form.Select aria-label="Default select example" value={priority} onChange={e=>setpriority(e.target.value)}>
                  <option value={0}>--انتخاب کنید--</option>
                  <option value="کم">کم</option>
                  <option value="متوسط">متوسط</option>
                  <option value="زیاد">زیاد</option>
                </Form.Select>
              </div>
              <div className="col-md-5 col-lg-5 col-12">
                <label htmlFor="">سفارش مربوطه</label>
                <Form.Select aria-label="Default select example" value={order_id} onChange={e=>setorder_id(e.target.value)}>
                  <option value={0}>--انتخاب کنید--</option>
                  {user&&user.order_set? user.order_set.map((item)=>{
                    return <option key={item.id} value={item.id}>{item.order_code}</option>
                  }): null}
                </Form.Select>
              </div>
              <div className="col-12 py-4">
                <label htmlFor="">متن پیام شما *</label>
                <textarea className="form-control" name="" id="" cols="30" rows="10" value={content} onChange={e=>setcontent(e.target.value)}></textarea>
              </div>
              <div className="col-12 text-center pb-4">
                <Button classes={{root: "success-gradient"}} onClick={_send}>
                    ارسال تیکت
                </Button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default SendTicket;