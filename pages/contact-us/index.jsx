import Head from 'next/head'
import React from 'react'
import Button from '@mui/material/Button'
import {useSelector} from 'react-redux'
import Link from 'next/link'
import axios from 'axios'
import {toast} from 'react-toastify'
import * as e from '../../redux/endpoints'
const Aster = ()=>{
    return  <b className="text-danger mx-2">*</b>
}
function ContactUs() {
    const config = useSelector(_=>_.main.configs)
    
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [message, setMessage] = React.useState("")

    const _send = (f) =>{
        f.stopPropagation()
        f.preventDefault()
        axios.post(e.SEND_CONTACT_US_MESSAGE, {name, email, message})
        .then(response=>{
            const {data} = response
            toast(data.message, {type: data.type})
            setName("")
            setEmail("")
            setMessage("")
        })
        .catch(err=>{
            console.log(err)
            toast.error("خطا در برقراری ارتباط")
        })
    }
    return (
        <section>
            <Head><title>تماس با ما | گیفت شاپ</title></Head>
           
            <div className="container mw-100 w-100">
                <div className="row">
                    <div className="google-addres">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=36.305417486054324,%2059.602965183683956&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                    <a href="https://123movies-to.org"></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 contact-us m-auto">
                        <h3 className="text-basket text-center py-4"> با ما در <span> تماس</span> باشید </h3>
                        <form className="form-contact" onSubmit={_send}>
                            <div className="col-12" >
                                <label for=""> <Aster/>نام و نام خانوادگی : </label>
                                <input type="text" className="form-control" required={true} value={name} onChange={e=>setName(e.target.value)}/>
                            </div>
                            <div className="col-12">
                                <label for=""><Aster/>ایمیل:  </label>
                                <input type="email" className="form-control" required={true} value={email} onChange={e=>setEmail(e.target.value)}/>
                            </div>
                            <div className="col-12">
                                <label for=""> <Aster/>پیام: </label>
                                <textarea name="" id="" cols="30" rows="10" className="form-control" required={true}  placeholder="پیام خود را وارد کنید" value={message} onChange={e=>setMessage(e.target.value)}></textarea>
                            </div>
                            <div className="col-6 col-md-5 py-5 m-auto d-flex justify-content-between w-100">
                                <div className="accept-pay  cursor-pointer">
                                    <a className=' w-100 h-100 p-0'><input type="submit" value="ارسال" className=' px-5 bg-transparent border-0 text-white w-100 h-100'></input></a>
                                </div>
                                <div className="accept-pay px-md-5">
                                    <a target="_blank" href={config&&config.contactus&&config.contactus.telegram_link?config.contactus.telegram_link: "https://telegram.org"}>
                                            پیام به تلگرام
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs