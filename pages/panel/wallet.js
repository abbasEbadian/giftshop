import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import Chip from "@mui/material/Chip";
import Head from "next/head";
import {useDispatch, useSelector} from 'react-redux'
import WalletDepositSelectCard from "../../components/SubBasket/WalletDepositSelectCard";
import axios from "axios";
import {GET_WALLET_DEPOSIT_LINK} from '../../redux/endpoints'
import {toast} from 'react-toastify'

function Wallet() {
    const user = useSelector(s=>s.auth.user)
    const [amount, setAmount] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    const [card, setCard] = React.useState(false)
    
    const _getPaymentLink = ()=>{
        axios.post(GET_WALLET_DEPOSIT_LINK, {
            amount, 
            card
        })
        .then(response =>{
            const {data} = response

            if(data.error === 0 && data.code !== ""){
                toast(data.message, {type: data.type})
                window.open("https://api.payping.ir/v2/pay/gotoipg/"+data.code)
            }else{
                toast(data.message, {type: data.type})
            }

        })
        .catch(e=>{
            toast.error("خطا در ارتباط")
            console.log(e)
        })
    }
    
   

    const columns = [
        { id: "id", label: "ردیف", minWidth: 100, align: "right" },
        {
            id: "unique",
            label: "شناسه",
            minWidth: 120,
            align: "center"
        },
        { id: "amount", label: "میزان شارژ", minWidth: 130, align: "right" },
        {
            id: "type",
            label: "روش پرداخت",
            minWidth: 50,
            align: "right",
            format: (value) => value.toLocaleString(),
        },
        {
            id: "status",
            label: "وضعیت",
            minWidth: 100,
            align: "center",
        },
        {
            id: "created",
            label: "تاریخ",
            minWidth: 170,
            align: "center"
        },
       

    ];

    
   
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const rows = [ ]
    return (
        <section className="container">
            <Head><title>گیفت استاپ | کیف پول</title></Head>

            <div className="row">
                <ProfileAside active="wallet" />
                <div className=" col-lg-9 col-12 py-5">
                    <h5 class="text-basket pb-3 m-0">
                        موجودی <span>کیف پول</span>
                    </h5>
                    <div className="wallet py-4 text-center">
                        <div className="CurrentBalance ">
                            <h5>
                                 اعتبار فعلی کیف پول شما : <span>{Number(user?.wallet?.balance || 0).toLocaleString('fa-IR')}</span> تومان است.
                            </h5>
                        </div>
                        <div className="IncreaseCredit d-flex col-12 justify-content-center align-items-center py-5">
                            <span className="col-2">میزان افزایش موجودی:</span>
                            <div className="col-4">
                                <Form.Select aria-label="Default select example" value={amount} onChange={e => setAmount(e.target.value)}>
                                    <option value={0}> --مقدار مورد نظر را وارد کنید--</option>
                                    {Array.from(Array(30)).map((_, idx) => {
                                        return (
                                            <>
                                                <option key={idx+1} value={(idx+1)*10000}>{(idx+1)*10000}</option>
                                            </>
                                        );
                                    })}
                                </Form.Select>
                            </div>
                        </div>
                        {Number(amount) > 0 ? <h4>
                            حساب کاربری شما به میزان
                            <span className="IncreaseCredit-text">
                                {Number(amount).toLocaleString('fa-IR')}
                            </span>
                            تومان شارژ خواهد شد.
                        </h4> : null}
                        
                        <div className="transferToPayment py-4">
                            <Button disabled={amount === 0} variant="contained" color="success" onClick={e=>setOpen(true)}>انتقال به درگاه پرداخت</Button>
                        </div>
                        <div className="table-info-payment py-4 p-2">
                            <Paper
                                sx={{ width: "100%", overflow: "hidden" }}
                                className="product-list-gift"
                            >
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={"right"}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {user&&user.wallet&&user.wallet.transaction_set?
                                                user.wallet.transaction_set.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, idx) => {
                                                    const status_text = row["status"]==="pending"?
                                                    "در انتظار پرداخت":row["status"]==="cancel"?"لغو شده"
                                                   :"واریز شده";

                                                   const status_color = row["status"]==="pending"?
                                                   "warning":row["status"]==="cancel"?"error"
                                                  :"success"
                                                   const status_icon = row["status"]==="pending"?
                                                   <WarningIcon /> : row["status"]==="cancel"? <CloseIcon />
                                                  :<DoneIcon />


                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.code}
                                                        >
                                                            <TableCell align={"right"}>{idx+1}</TableCell>
                                                            <TableCell align={"right"}>{row["description"]}</TableCell>
                                                            <TableCell align={"right"}>{Number(row["amount"]).toLocaleString()} تومان</TableCell>
                                                            <TableCell align={"right"}>{row["type"]==="bank_deposit"? "واریز مستقیم": "تبدیل امتیاز"}</TableCell>
                                                            <TableCell align={"right"}><Chip variant="outlined" label={status_text} color={status_color} icon={status_icon}></Chip></TableCell>
                                                            <TableCell align={"right"}>{new Date(row["created"]).toLocaleDateString('fa', {year: "numeric", month: "long", day: "numeric"})} {" "} {new Date(row["created"]).toLocaleTimeString('fa')}</TableCell>

                                                            
                                                        </TableRow>
                                                    );
                                                }): null}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div dir="ltr">
                                {user&&user.wallet&&user.wallet.transaction_set.length > 10?<TablePagination
                                    component="div"
                                    count={user&&user.wallet&&user.wallet.transaction_set.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelRowsPerPage=""
                                    classes={{
                                        displayedRows: "mb-0",
                                        select: "ps-5 "
                                    }}
                                    />:null}
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
            <WalletDepositSelectCard cards={user?.creditcard_set || []} open={open} setOpen={setOpen} onClick={_getPaymentLink} card={card} setCard={setCard}/>
        </section>
    );
}
export default Wallet;