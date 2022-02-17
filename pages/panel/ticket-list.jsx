import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Button } from "@mui/material";
import TicketChat from '../../components/subTicket/TicketChat'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import * as _ from 'lodash'
import { useSelector } from "react-redux";
function SendTicket(props) {
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState(false);
    const [order, setOrder ] = React.useState();
    const [ticket, setTicket ] = React.useState();

    const user = useSelector(s=>s.auth.user)
    const [tickets, setTickets] = React.useState({})
    const [active, setActive] = React.useState("all")
    const types = [
        "pending",
        "answered",
        "closed",
    ]
    const colors = [
        "warning",
        'success',
        'error'
    ]
    
    React.useEffect(()=>{
        setTickets(_.groupBy(user?.ticket_set, e=>e.status))
    }, [user])

    const geticon = (status)=>{
        switch(status){
            case "answered": return <LibraryAddCheckIcon/>
            case "pending": return <LibraryAddIcon/>
            case "closed": return <DoDisturbOffIcon/>
            default : return <LibraryBooksIcon/>
        }
    }
    
    const getcolor = (status)=>{
        switch(status){
            case "answered": return "success"
            case "pending": return "warning"
            case "closed": return "error"
            default : return "primary"
        }
    }
    
    return (
        <section className="container">
            <Head><title>گیفت استاپ |تیکت ها</title></Head>

            <div className="row">
                <ProfileAside active="new_ticket" />
                <div className=" col-lg-9 col-12 py-5">
                    <h5 class="text-basket pb-3 m-0">
                        لیست <span>تیکت ها</span>
                    </h5>
                    <div className="ticket-info-s">
                        <div className="list-ticket-show">
                            <Button  className="all-ticket col-2 co-lg-2 " variant={active==="all"?"contained":""} onClick={e=>setActive('all')}>
                                <div className="d-flex flex-column">
                                    <div className="pb-2">
                                        {geticon("all")}
                                    </div>
                                    <p>{"همه" }</p>
                                    <p>{user?.ticket_set?.length}</p>
                                </div>
                            </Button>
                            {types.map((item, idx)=>{
                                const text = item === "pending"? "درحال بررسی":
                                item === "answered"? "پاسخ داده شده":
                                item === 'closed'? "بسته شده": ""
                                return <Button key={item} className="all-ticket col-2 co-lg-2 " color={colors[idx]} variant={active===item?"contained":""} onClick={e=>setActive(item)}>
                                    <div className="d-flex flex-column">
                                        <div className="pb-2">
                                            {geticon(item)}
                                        </div>
                                        <p>{text}</p>
                                        <p>{tickets[item]?.length || 0}</p>
                                    </div>
                                    
                            </Button>
                            })}
                            
                            
                        </div>
                        <div className="info-ticket-list">
                                {user&&user.ticket_set? user.ticket_set.map((item, idx) => {
                                    return (item.status === active || active === "all") && (
                                        <div className={"AnswerTicketShow " + item.status}>
                                        <>
                                            <Button onClick={e=>{
                                                    setOpen(true)
                                                    setTicket(item)
                                                    setOrder(item.order_id)
                                                    setColor(getcolor(item.status))
                                                }} > 
                                                <div className="d-flex align-items-center">
                                                    <p>{item.title}</p>
                                                </div>

                                                <div>
                                                    {new Date(item.created).toLocaleDateString("fa")}
                                                </div>
                                            </Button>
                                        </>
                                    </div>
                                    ) 
                                }): <div className="alert alert-primary mt-5">تیکتی برای نمایش وجود ندارد</div>}
                        </div>
                        
                    </div>
                </div>
            </div >
            <TicketChat setOpen={setOpen} open={open} order={order} ticket={ticket} color={color}/>
        </section >
    );
}
export default SendTicket;