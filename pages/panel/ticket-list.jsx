import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Button,Typography , Card  } from "@mui/material";
import TicketChat from '../../components/subTicket/TicketChat'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';

import * as _ from 'lodash'
import * as e from '../../redux/endpoints'
import { useSelector } from "react-redux";
import { profile } from "../../redux/actions";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import withAuth from '../../redux/withAuth'
import {TailSpin} from 'react-loader-spinner'
function SendTicket(props) {
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState(false);
    const [order, setOrder ] = React.useState();
    const [ticket, setTicket ] = React.useState();

    const user = useSelector(s=>s.auth.user)
    const [tickets, setTickets] = React.useState({})
    const [loading, setLoading] = React.useState(false)
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
    const dispatch = useDispatch()
    React.useEffect(()=>{
        setTickets(_.groupBy(user?.ticket_set, e=>e.status))
    }, [user])
    React.useEffect(()=>{
        setLoading(true)
        dispatch(profile(setLoading))
    }, [])
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
    
    const closeTicket= (id)=>{
        axios.post(e.CLOSE_TICKET, {id})
        .then(response=>{
            const {data} = response
            if(data.error === 0) dispatch(profile())
            toast(data.message, {type: data.type})
        })
        .catch(err=>{
            console.log(err);
            toast.error("خطا در ارتباط")
        })
    }
    return (
        <section className="container">
            <Head><title>گیفت استاپ |تیکت ها</title></Head>

            <div className="row">
                <ProfileAside active="new_ticket" />
                <div className=" col-lg-9 col-12 py-5">
                    <h5 className="text-basket pb-3 m-0">
                        لیست <span>تیکت ها</span>
                    </h5>
                    <div className="ticket-info-s">
                        <div className="list-ticket-show  flex-wrap row">
                            <Button  className="all-ticket col-6 col-lg-3 " variant={active==="all"?"contained":""} onClick={e=>setActive('all')}>
                                <div className="d-flex flex-column">
                                    <div className="pb-2">
                                        {geticon("all")}
                                        <span className="px-2">{"همه" }</span>
                                    </div>
                                    <p>{user?.ticket_set?.length}</p>
                                </div>
                            </Button>
                            {types.map((item, idx)=>{
                                const text = item === "pending"? "درحال بررسی":

                                item === "answered"? "پاسخ داده شده":
                                item === 'closed'? "بسته شده": ""
                                return <Button key={item} className="all-ticket col-6 col-lg-3 " color={colors[idx]} variant={active===item?"contained":""} onClick={e=>setActive(item)}>
                                    <div className="d-flex flex-column">
                                        <div className="pb-2">
                                            {geticon(item)}
                                        <small className="px-2">{text}</small>
                                        </div>
                                        <p>{tickets[item]?.length || 0}</p>
                                    </div>
                                    
                            </Button>
                            })}
                            
                            
                        </div>
                        <div className="info-ticket-list">
                                {user&&user.ticket_set? user.ticket_set.reverse().map((item, idx) => {
                                    return (item.status === active || active === "all") && (
                                        <Card className={"AnswerTicketShow " + item.status + " " + (item.status==="closed"? "opacity-50":"")} key={idx}>
                                            <div className="d-flex align-items-center w-100">
                                                <p className={item.seen_by_user?"seen": ""}>{item.title}</p>
                                                <div className="d-flex align-items-center  me-auto ">
                                                    <Button onClick={e=>{
                                                        setOpen(true)
                                                        setTicket(item)
                                                        setOrder(item.order_id)
                                                        setColor(getcolor(item.status))
                                                    }} size="small" variant="outlined" color="info">نمایش</Button>
                                                    {item&&item.status !== "closed" ? <Button size="small" className="text-nowrap text-center" onClick={e=>closeTicket(item.id)} variant="outlined">بستن تیکت</Button>:null}
                                                    <div className='d-flex flex-column me-4'>
                                                        {new Date(item.created).toLocaleDateString("fa")}
                                                        <Typography sx={{fontSize: "10px", "whiteSpace": "nowrap"}} component={"span"} color={getcolor(item.status)}>
                                                        {item?.status === "answered"? "پاسخ داده شده": item?.status==="closed"? "بسته شده": "در حال بررسی" }

                                                        </Typography>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </Card>
                                    ) 
                                }): loading?
                                <div className="d-flex align-items-end mt-5">
                                <TailSpin width={40} height={30} color={"#39ACF1"}/> 
                                <span className="mx-4">در حال دریافت</span>
                                </div>
                                :<div className="alert alert-primary mt-5">تیکتی برای نمایش وجود ندارد</div>}
                        </div>
                        
                    </div>
                </div>
            </div >
            <TicketChat setOpen={setOpen} open={open} order={order} ticket={ticket} color={color}/>
        </section >
    );
}
export default withAuth(SendTicket);