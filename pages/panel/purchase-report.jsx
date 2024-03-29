import React from "react";
import ProfileAside from '../../components/ProfileAside'
import ConvertPointToWalletButton from '../../components/subPanel/ConvertPointToWalletButton'
import withAuth from "../../redux/withAuth";
import {profile} from "../../redux/actions";
import Head from "next/head";
import {useSelector, useDispatch} from 'react-redux'
import {Accordion, AccordionDetails, AccordionSummary, Grid,Button, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import * as _ from 'lodash'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function PurchaseReport() {
  const user = useSelector(s=>s.auth.user)
  const get_status = (t)=>{
    switch(t.toLowerCase()){
      case "pending": return {text: "در حال ارسال", color: "warning" }
      case "pending_auth": return {text: "در حال بررسی", color: "warning" }
      case "done": return {text: "موفق", color: "success" }
      case "cancel": return {text: "لغو شده", color: "danger" }

    }
  }
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(profile())
  }, [])
  return (
    <>
      <Head><title>گیفت استاپ | گزارش خرید</title></Head>

      <section className="container">
        <div className="row">
          <ProfileAside active="purchase_report"/>
          <div className="col-md-9 mb-5">
          <h5 className="text-basket py-3">گزارش <span>خریدها</span></h5>
          <div>
            {user && user.order_set && user.order_set.filter(i=>i.status!="draft").length ? 
              user.order_set.sort((a,b)=> new Date(b.purchased_date) - new Date(a.purchased_date)).filter(i=>i.status!=="draft").map((i, idx)=>{
                const {text, color} = get_status(i.status)
                const group = _.groupBy(i.orderline_set, c => c.template_id?.id)
              return <Accordion  key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{i.order_code} </Typography>
                  <span className={"mx-4 text-"+color}>{text}</span>
                  <span className="text-black-50">{new Date(i.purchased_date).toLocaleDateString('fa', {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  })}</span>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={6}>
                      <>
                        <h6>
                          پرداختی: {i.final_price  - (i.discount_code_amount || 0)} {" تومان"}
                        </h6>
                      </>
                    </Grid>
                    <Grid item xs={6}>
                      <>{
                        i.status === "done"?
                        <p className="text-start"> تاریخ پرداخت { " " }{new Date(i.purchased_date).toLocaleDateString('fa')} {" "} {new Date(i.purchased_date).toLocaleTimeString('fa')}</p>
                        :<p className="text-start">  تاریخ ثبت { " " }{new Date(i.updated).toLocaleDateString('fa')} {" "} {new Date(i.updated).toLocaleTimeString('fa')}</p>
                      }
                      </>
                    </Grid>
                    <Grid item xs={6}>
                      <>
                        امتیاز این خرید: {i.points}
                      </>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "left"}}>
                      <>
                        {i.status === "done"? <ConvertPointToWalletButton id={i.id} points_converted={i.points_converted}/>:null}
                      </>
                    </Grid>
                  </Grid>
                  
                        <br/>
                  <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">ردیف</TableCell>
                          <TableCell align="right">دسته بندی</TableCell>
                          <TableCell align="right">قیمت</TableCell>
                          <TableCell align="right">ریجن</TableCell>
                          <TableCell align="right">تعداد</TableCell>
                          {/* <TableCell align="right">مجموع</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(group).map((key, idx) => (
                          <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" align="right">
                              {idx+1}
                            </TableCell>
                            <TableCell align="right">{group[key][0].template_id.brand_id.name}</TableCell>
                            <TableCell align="right">{group[key][0].template_id.real_price}</TableCell>
                            <TableCell align="right">{group[key][0].template_id.country_id.symbol}</TableCell>
                            <TableCell align="right">{group[key].length}</TableCell>
                            
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {i.status === "done"?<>
                    <h5 className="mt-3">کدها</h5>
                    <ul >
                    {i.orderline_set?i.orderline_set.map(j=>{
                        return <><li >  
                          <span>{j?.template_id?.full_name} </span>{" : "} {j.card_id?.pin2?<><br /></>:null}
                            <span className="text-success">{j.card_id?.pin}</span>
                            {j.card_id?.pin2?<><br /><span className="text-success">{j.card_id.pin2}</span></>:null}
                        </li><hr></hr></>
                        
                    }):""}
                    </ul>
                    </>
                  : null}
                </AccordionDetails>
              </Accordion>
            })
            : <div className="alert alert-infi">سابقه ای برای نمایش وجود ندارد</div>
            }
            
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withAuth(PurchaseReport);
