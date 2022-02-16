import React from "react";
import ProfileAside from "../../components/ProfileAside";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import profilePic from "../../img/icon/user-profile.png"


function SendTicket(props) {

    return (
        <section classNameName="container">
            <Head><title>گیفت استاپ | ارسال تیکت</title></Head>

            <div classNameName="row">
                {/* <ProfileAside active="new_ticket" /> */}
                <div classNameName=" col-lg-9 col-12 py-5">
                    <h5 className="text-basket pb-3 m-0">
                        ارسال <span>تیکت</span>
                    </h5>
                   <form action="#" method="post">
                   <div className="inbox_msg">
                        <div className="mesgs">
                            <div className="msg_history">
                                <div className="incoming_msg">
                                    <div className="incoming_msg_Image"> <Image src={profilePic} alt="sunil" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>Test which is a new approach to have all
                                                solutions</p>
                                            <span className="time_date"> 11:01 AM    |    June 9</span></div>
                                    </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Test which is a new approach to have all
                                            solutions</p>
                                        <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                                </div>
                                <div className="incoming_msg">
                                    <div className="incoming_msg_Image"> <Image src={profilePic} alt="sunil" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>Test, which is a new approach to have</p>
                                            <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
                                    </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>
                                <div className="incoming_msg">
                                    <div className="incoming_msg_Image"> <Image src={profilePic} alt="sunil" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>We work directly with our designers and suppliers,
                                                and sell direct to you, which means quality, exclusive
                                                products, at a price anyone can afford.</p>
                                            <span className="time_date"> 11:01 AM    |    Today</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text" className="write_msg" placeholder="متن پیام را وارد کنید" />
                                    {/* <textarea name="" className="form-control" id="" cols="30" rows="10"></textarea> */}
                                    <button className="msg_send_btn" type="button"><i className="bi bi-send" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                   </form>
                </div>
            </div>
        </section>
    );
}
export default SendTicket;