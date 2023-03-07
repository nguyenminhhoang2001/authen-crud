import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SimpleContainer from "./Container";
import PrimarySearchAppBar from "./Header";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BasicTable from "./Table";
import { Box, Pagination } from "@mui/material";
import FormDialog from "./FormAdd";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState(false);
  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <SimpleContainer>
        <Grid item xs={8}>
          <Item>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <FormDialog setChange={setChange} edit={edit} setEdit={setEdit} />
            </Box>
          </Item>
        </Grid>
        <BasicTable change={change} setChange={setChange} setEdit={setEdit} />
      </SimpleContainer>
      <Outlet />
    </>
  );
};

export default Home;
