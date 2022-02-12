import Head from 'next/head'
import React from 'react'
function ContactUs() {
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
                        <div className="form-contact">
                            <div className="col-12">
                                <label for="">نام و نام خانوادگی</label>
                                <input type="text" className="form-control" required="" />
                            </div>
                            <div className="col-12">
                                <label for="">ایمیل</label>
                                <input type="email" className="form-control" required="" />
                            </div>
                            <div className="col-12">
                                <label for="">پیام</label>
                                <textarea name="" id="" cols="30" rows="10" className="form-control" placeholder="پیام خود را وارد کنید"></textarea>
                            </div>
                            <div className="col-6 col-md-5 py-5 m-auto">
                                <div className="accept-pay">
                                    <a href="#">ارسال</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs