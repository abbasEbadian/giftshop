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
import Head from "next/head";

function Wallet() {
    const [amount, setAmount] = React.useState(0)
    const [CurrentBalance, setCurrentBalance] = React.useState([
        {
            balance: "2300000"
        }
    ])
    const [IncreaseCredit, setIncreaseCredit] = React.useState([
        200000,
        250000,
        300000,
        350000
    ])

    const columns = [
        { id: "number", label: "شناسه", minWidth: 100, align: "right" },
        { id: "chargeRate", label: "میزان شارژ", minWidth: 130, align: "right" },
        {
            id: "PaymentMethod",
            label: "روش پرداخت",
            minWidth: 50,
            align: "right",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "status",
            label: "وضعیت",
            minWidth: 100,
            align: "center",
            format: (value) => value.toLocaleString("en-US"),
        },
        {
            id: "date",
            label: "تاریخ",
            minWidth: 170,
            align: "center",
        },

    ];

    function createData(number, chargeRate, PaymentMethod, status, date) {
        return { number, chargeRate, PaymentMethod, status, date };
    }

    const rows = [
        createData(
            "001",
            "200000 تومان",
            "درگاه بانکی",
            "موفق",
            "2022-02-04T22:53:38.542904+03:30"
        ),
        createData(
            "001",
            "200000 تومان",
            "درگاه بانکی",
            "موفق",
            "2022-02-04T22:53:38.542904+03:30"
        ),
        createData(
            "001",
            "200000 تومان",
            "درگاه بانکی",
            "موفق",
            "2022-02-04T22:53:38.542904+03:30"
        ),
        createData(
            "001",
            "200000 تومان",
            "درگاه بانکی",
            "موفق",
            "2022-02-04T22:53:38.542904+03:30"
        ),
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
                                {CurrentBalance.map((item, idx) => {
                                    return (
                                        <>
                                            <p >
                                                اعتبار فعلی کیف پول شما : <span>{Number(item.balance).toLocaleString('fa-IR')}</span> تومان است.
                                            </p>
                                        </>
                                    );
                                })}
                            </h5>
                        </div>
                        <div className="IncreaseCredit d-flex col-12 justify-content-center align-items-center py-5">
                            <span className="col-2">میزان افزایش موجودی:</span>
                            <div className="col-4">
                                <Form.Select aria-label="Default select example" value={amount} onChange={e => setAmount(e.target.value)}>
                                    <option value="0"> --مقدار مورد نظر را وارد کنید--</option>
                                    {IncreaseCredit.map((item, idx) => {
                                        return (
                                            <>
                                                <option value={item}>{item}</option>
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
                        <div className="payment-gateway col-3 py-4 m-auto">
                            <Form.Select aria-label="Default select example">
                                <option value="1">درگاه زیبال</option>
                                <option value="1">درگاه زرین پال</option>
                            </Form.Select>
                        </div>
                        <div className="transferToPayment py-4">
                            <Link href="">
                                <a className="btn success-gradient px-5">
                                    انتقال به درگاه پرداخت
                                </a>
                            </Link>
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
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.code}
                                                        >
                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                if (column.id === "date") {
                                                                    console.log(new Date(value), value)
                                                                }
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.format && typeof value === "number"
                                                                            ? column.format(value)
                                                                            : column.id === "date"
                                                                                ? new Date(value).toLocaleDateString(
                                                                                    "fa-IR",
                                                                                    {
                                                                                        year: "numeric",
                                                                                        month: "long",
                                                                                        day: "numeric",
                                                                                    }
                                                                                )
                                                                                : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Wallet;