import * as React from "react";
import ProfileAside from '../../components/ProfileAside'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import withAuth from "../../redux/withAuth";
import Head from "next/head";
const columns = [
  { id: "number", label: "شماره", minWidth: 100, align: "right" },
  { id: "date", label: "تاریخ", minWidth: 100, align: "right" },
  {
    id: "rate",
    label: "امتیاز",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "money",
    label: "موجودی",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "info",
    label: "توضیحات",
    minWidth: 170,
    align: "center",
  },
  {
    id: "process",
    label: "عملیات",
    minWidth: 170,
    align: "center",
  },
];

function createData(number, date, rate, money, info) {
  //   const density = population / size;
  // return { number, date, rate, size, density };
  return { number, date, rate, money, info };
}

const rows = [
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
  createData(
    "001",
    "2022-02-04T22:53:38.542904+03:30",
    2000,
    3287263,
    "لورم اپیسوم متن ساختگی"
  ),
];

 function StickyHeadTable() {
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
    <div className="container">
      <Head><title>سطح کاربری | گیفت شاپ</title></Head>
      <div className="row">
        <ProfileAside active="purchase_report" />
        <div className=" col-lg-9 col-12 py-5">
        <h5 class="text-basket pb-3 m-0">گزارش <span>خریدها</span></h5>
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
  );
}
export default withAuth(StickyHeadTable)