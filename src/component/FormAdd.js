import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { StoreContext } from "../store/AppContext";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState({
    id: "",
    nameProduct: "",
    price: "",
    linkImg: "",
    content: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAdd = () => {
    fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((data) => {
      if (data.status === 201) {
        setProduct({
          ...product,
          nameProduct: "",
          price: "",
          linkImg: "",
          content: "",
        });
        setOpen(false);
        props.setChange(true);
      }
    });
  };
  React.useEffect(() => {
    setOpen(props.edit);
  }, [props.edit]);
  const [data1] = StoreContext();
  React.useEffect(() => {
    setProduct({
      id: data1.edit.id,
      nameProduct: data1.edit.nameProduct,
      price: data1.edit.price,
      linkImg: data1.edit.linkImg,
      content: data1.edit.content,
    });
  }, [data1.edit]);
  const handleClose = () => {
    setProduct({
      id: "",
      nameProduct: "",
      price: "",
      linkImg: "",
      content: "",
    });
    setOpen(false);
    props.setEdit(false);
  };
  const handleUpdate = () => {
    fetch(`http://localhost:3000/product/${product.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify(product),
      },
      body: JSON.stringify(product),
    }).then((data) => data.json());
    setProduct({
      id: "",
      nameProduct: "",
      price: "",
      linkImg: "",
      content: "",
    });
    setOpen(false);
    props.setChange(true);
    props.setEdit(false);
  };
  const handleSubmit = () => {
    console.log("runnnnnnn");
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD PRODUCT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add product</DialogTitle>

        <Box>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name product"
            type="text"
            fullWidth
            variant="standard"
            value={product.nameProduct}
            onChange={(e) =>
              setProduct({ ...product, nameProduct: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="price(VND)"
            type="text"
            fullWidth
            variant="standard"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="link img"
            type="text"
            fullWidth
            variant="standard"
            value={product.linkImg}
            onChange={(e) =>
              setProduct({ ...product, linkImg: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="content"
            type="text"
            fullWidth
            variant="standard"
            value={product.content}
            onChange={(e) =>
              setProduct({ ...product, content: e.target.value })
            }
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>update</Button>
          <Button onClick={handleAdd}>add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
