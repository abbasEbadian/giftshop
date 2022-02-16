import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Button } from "@mui/material";
import Icon from "../../img/icon/icon.png"
import Icon2 from "../../img/icon/Icon(1).png"
import Icon3 from "../../img/icon/Icon(2).png"
import Icon4 from "../../img/icon/Icon(3).png"

function SendTicket(props) {
    const [AllTicketShow, setAllTicketShow] = React.useState([
        {
            ShowTicket: "تمامی پیام ها",
            count: 20
        }
    ]);
    const [AnswerTicketShow, setAnswerTicketShow] = React.useState([
        {
            ShowTicket: "پاسخ داده شده",
            count: 20
        }
    ]);
    const [EndTicketShow, setEndTicketShow] = React.useState([
        {
            ShowTicket: "بسته شده",
            count: 20
        }
    ]);
    const [PendingTicketShow, setPendingTicketShow] = React.useState([
        {
            ShowTicket: "درحال بررسی",
            count: 20
        }
    ]);
    const [consistency, setconsistency] = React.useState([
        {
            titleConsistency: "پیگیری خرید ناموفق",
            newConsistency: "جدید"
        }
    ]);
    const d = new Date();
    let Time = d.toLocaleTimeString()

    return (
        <section className="container">
            <Head><title>گیفت استاپ | ارسال تیکت</title></Head>

            <div className="row">
                <ProfileAside active="new_ticket" />
                <div className=" col-lg-9 col-12 py-5">
                    <h5 class="text-basket pb-3 m-0">
                        ارسال <span>تیکت</span>
                    </h5>
                    <div className="ticket-info-s">
                        <div className="list-ticket-show">
                            <Button className="all-ticket col-2 co-lg-2 ">
                                {AllTicketShow.map((item, idx) => {
                                    return (
                                        <div className="d-flex flex-column">
                                            <div className="pb-2">
                                                <Image src={Icon} alt="ticket"></Image>
                                            </div>
                                            <p>{item.ShowTicket}</p>
                                            <p>{item.count}</p>
                                        </div>
                                    );
                                })}
                            </Button>
                            <Button className="all-ticket col-2 co-lg-2 ">
                                {AnswerTicketShow.map((item, idx) => {
                                    return (
                                        <div className="d-flex flex-column">
                                            <div className="pb-2">
                                                <Image src={Icon2} alt="ticket"></Image>
                                            </div>
                                            <p>{item.ShowTicket}</p>
                                            <p>{item.count}</p>
                                        </div>
                                    );
                                })}
                            </Button>
                            <Button className="all-ticket col-2 co-lg-2 ">
                                {EndTicketShow.map((item, idx) => {
                                    return (
                                        <div className="d-flex flex-column">
                                            <div className="pb-2">
                                                <Image src={Icon3} alt="ticket"></Image>
                                            </div>
                                            <p>{item.ShowTicket}</p>
                                            <p>{item.count}</p>
                                        </div>
                                    );
                                })}
                            </Button>
                            <Button className="all-ticket col-2 co-lg-2 ">
                                {PendingTicketShow.map((item, idx) => {
                                    return (
                                        <div className="d-flex flex-column ">
                                            <div className="pb-2">
                                                <Image src={Icon4} alt="ticket"  ></Image>
                                            </div>
                                            <p>{item.ShowTicket}</p>
                                            <p>{item.count}</p>
                                        </div>
                                    );
                                })}
                            </Button>
                        </div>
                        <div className="info-ticket-list">
                            <div className="  AnswerTicketShow">
                                {consistency.map((item, idx) => {
                                    return (
                                        <>
                                            <Button>
                                                <div className="d-flex align-items-center">
                                                    <p>{item.titleConsistency}</p>
                                                    <p className="pr-3">({item.newConsistency})</p>
                                                </div>

                                                <div>
                                                    {Time}
                                                </div>
                                            </Button>
                                        </>
                                    );
                                })}
                            </div>
                            <div className="closed">
                                {consistency.map((item, idx) => {
                                    return (
                                        <>
                                            <Button>
                                                <div className="d-flex align-items-center">
                                                    <p>{item.titleConsistency}</p>
                                                    <p className="pr-3">({item.newConsistency})</p>
                                                </div>

                                                <div>
                                                    {Time}
                                                </div>
                                            </Button>
                                        </>
                                    );
                                })}
                            </div>
                            <div className="pending-ticket">
                                {consistency.map((item, idx) => {
                                    return (
                                        <>
                                            <Button>
                                                <div className="d-flex align-items-center">
                                                    <p>{item.titleConsistency}</p>
                                                    <p className="pr-3">({item.newConsistency})</p>
                                                </div>

                                                <div>
                                                    {Time}
                                                </div>
                                            </Button>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}
export default SendTicket;