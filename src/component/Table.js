import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Pagination } from "@mui/material";
import { setEdit } from "../store/Action";

import { StoreContext } from "../store/AppContext";

export default function BasicTable(props) {
  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [search] = StoreContext();
  console.log(search.search);
  React.useEffect(() => {
    fetch(
      `https://authen-crud-g80gi2b2r-nguyenminhhoang2001.vercel.app/product?nameProduct=${search.search}`
    )
      .then((dataPage) => dataPage.json())
      .then((dataPage) => setData(dataPage));
  }, [search.search]);
  const getList = () => {
    fetch(
      "https://authen-crud-g80gi2b2r-nguyenminhhoang2001.vercel.app/product"
    )
      .then((data) => data.json())
      .then((data) => {
        setCount(Math.ceil(data.length / 5));
      });
    fetch(
      `https://authen-crud-g80gi2b2r-nguyenminhhoang2001.vercel.app/product?_page=${page}&_limit=5`
    )
      .then((dataPage) => dataPage.json())
      .then((dataPage) => setData(dataPage));
  };
  React.useEffect(() => {
    getList();
  }, [page]);

  const handleDelete = (id1) => {
    fetch(
      `https://authen-crud-g80gi2b2r-nguyenminhhoang2001.vercel.app/product/${id1}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        getList();
      });
  };
  if (props.change === true) {
    getList();
    props.setChange(false);
  }
  const [state, dispatch] = StoreContext();
  const handleEdit = (id) => {
    const dataFilter = data.filter((e) => e.id === id);
    dispatch(setEdit(dataFilter[0]));
    props.setEdit(true);
  };
  return (
    <>
      {" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "50px" }}>ID</TableCell>
              <TableCell sx={{ width: "200px" }} align="right">
                NAME PRODUCT
              </TableCell>
              <TableCell sx={{ width: "350px" }} align="right">
                LINK IMG
              </TableCell>
              <TableCell sx={{ width: "300px" }} align="right">
                CONTENT
              </TableCell>
              <TableCell align="right">PRICE </TableCell>
              <TableCell sx={{ width: "250px" }} align="right">
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell align="right">{data.nameProduct}</TableCell>
                <TableCell align="right">{data.linkImg}</TableCell>
                <TableCell align="right">{data.content}</TableCell>
                <TableCell align="right">{data.price}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                    sx={{ marginRight: "20px" }}
                    variant="contained"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      handleEdit(data.id);
                    }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}
        count={count}
        onChange={(e, page1) => {
          setPage(page1);
        }}
        color="primary"
      />
    </>
  );
}
