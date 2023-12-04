import DeleteIcon from "@mui/icons-material/Delete";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Divider,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import { catProductList } from "../actions/catProductAction";
import {
  deleteenquiry,
  enquiryresponce,
  prodEnquiryList,
} from "../actions/prodEnquiryAction";
import TextField from "@material-ui/core/TextField";
import { PRODUCT_ENQUIRY_DELETE_RESET } from "../constants/prodEnquiryConstant";

function ProductEnquiryScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productEnquiryList = useSelector((state) => state.productEnquiryList);
  const { prodEnqList } = productEnquiryList;
  const catalogProd = useSelector((state) => state.catalogProd);
  const { catProducts } = catalogProd;
  const productEnquirydel = useSelector((state) => state.productEnquirydel);
  const { success } = productEnquirydel;

  useEffect(() => {
    dispatch(prodEnquiryList());
    dispatch(catProductList());
    if (success) {
      dispatch({ type: PRODUCT_ENQUIRY_DELETE_RESET });
    }
  }, [dispatch, success]);

  // **************************************
  const [open, setOpen] = useState(false);
  const [ProdId, setProdId] = useState("");
  const handleClickOpen = (params) => {
    setProdId(params.productId);
    setOpen(true);
  };

  // ================> Customer Enquiry Form <==========================
  const [opened, setOpened] = useState(false);
  const handleClosed = () => {
    setOpened(false);
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reqmessage, setReqmessage] = useState("");

  const submitHandler = () => {
    dispatch(
      enquiryresponce({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        reqmessage: reqmessage,
      }),
    );
  };

  const handleClickOpened = () => {
    setOpened(true);
  };

  const newevent = (e) => {
    setFname(e.row.fname);
    setLname(e.row.lname);
    setPhone(e.row.phone);
    setEmail(e.row.email);
  };

  const deleteAddressHandler = (params) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteenquiry(params.row._id));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleview = () => {
    navigate(`/productview/${ProdId}`);
  };
  // ******************************************************

  function getprodName(params) {
    return params?.row?.productId
      ? catProducts?.find((x) => x?._id === params?.row?.productId)?.prodname
      : "null";
  }

  const columns = [
    {
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },
    {
      field: "fname",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "First Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lname",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Last Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Email",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Mobile",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "reqmessage",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Requested Message",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "productId",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "productId",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getprodName,
    },

    {
      field: "createdAt",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Enqiry date",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Replay",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Replay",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <ForwardToInboxIcon
            onClick={(e) => {
              handleClickOpened();
              newevent(params, e);
            }}
            style={{
              color: "blue",
              fontSize: 25,
              fontWight: "Bold",
              margin: 20,
              cursor: "pointer",
            }}
          />
        );
      },
    },

    {
      field: "details",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "Product Details",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <ShoppingBasketIcon
            onClick={() => handleClickOpen(params.row)}
            style={{
              color: "blue",
              fontSize: 25,
              fontWight: "Bold",
              margin: 20,
              cursor: "pointer",
            }}
          />
        );
      },
    },
    {
      field: "Delete",
      width: 125,
      minWidth: 150,
      maxWidth: 200,
      headerName: "ACTIONS",
      color: "red",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <DeleteIcon
            onClick={() => deleteAddressHandler(params)}
            style={{
              color: "#FF3333",
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ mt: -4 }}>
        Customer Enquiry
      </Typography>
      <Box sx={{ display: "flex", mt: 0 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            to="/"
            style={{
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "13px",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>Home</Typography>
          </Link>

          <Typography sx={{ fontSize: "13px" }}>Customer Enquiry</Typography>
        </Breadcrumbs>
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {catProducts
          ?.filter((item) => {
            return item._id === ProdId;
          })
          .map(
            (item) => (
              (
                <>
                  <DialogContent
                    sx={{
                      width: 500,
                      hight: 700,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: "10px",
                        border: "1px solid black",
                      }}
                    >
                      <Box sx={{ color: "red", p: "10px" }}>
                        <h2>Order Detail</h2>
                      </Box>
                      <section className="vh-100 gradient-custom-2">
                        <div className="container py-5 h-100">
                          <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-10 col-lg-8 col-xl-6">
                              <div
                                className="card card-stepper"
                                style={{ borderRadius: 16 }}
                              >
                                <div className="card-header p-4">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <p className="text-muted mb-2">
                                        Prodname :{" "}
                                        <span className="fw-bold text-body">
                                          {item.prodname}
                                        </span>
                                      </p>
                                      <p className="text-muted mb-0">
                                        {" "}
                                        Quantity :{" "}
                                        <span className="fw-bold text-body">
                                          {item.quantity}
                                        </span>{" "}
                                      </p>
                                      <p className="text-muted mb-2">
                                        Price :{" "}
                                        <span className="fw-bold text-body">
                                          ₹{item.taxincluded}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body p-4">
                                  <div className="d-flex flex-row mb-4 pb-2">
                                    <div>
                                      <img
                                        className="align-self-center img-fluid"
                                        src={`/api/uploads/showCatProd/${item._id}`}
                                        width={250}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <Button onClick={handleview}>View Deatils</Button>
                    </Box>
                  </DialogContent>
                </>
              )
            ),
          )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          height: 400,
          width: "100%",

          "& .super-app-theme--header": {
            backgroundColor: "#808080",
            color: "#ffffff",
          },
          "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            fontSize: 16,
          },
          ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
            fontSize: 13,
          },
          ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
          {
            backgroundColor: "#330033",
            color: "#ffffff",
          },
          ".css-h4y409-MuiList-root": {
            display: "grid",
          },
          ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
          {
            backgroundColor: "#808080",
          },
        }}
      >
        <DataGrid
          sx={{
            boxShadow: 10,
            borderRadius: 0,
            m: 2,
          }}
          columns={columns}
          rows={prodEnqList ? prodEnqList : ""}
          getRowId={(rows) => rows._id}
          VerticalAlignment="Center"
          rowHeight={40}
          headerHeight={35}
          pagination
          checkboxSelection
        />
      </Box>
      <Dialog
        open={opened}
        onClose={handleClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            width: 500,
            hight: 700,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ color: "#000000", p: "10px" }}>
              <h2>Product Enquiry Form</h2>
            </Box>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-10 col-lg-8 col-xl-6">
                  <div
                    className="card card-stepper"
                    style={{ borderRadius: 16 }}
                  >
                    <div className="card-header p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <form onSubmit={submitHandler}>
                          <TextField
                            id="first-name"
                            label="First Name:"
                            margin="normal"
                            fullWidth
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                          />
                          <TextField
                            id="first-name"
                            label="Last Name:"
                            margin="normal"
                            fullWidth
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            required
                          />
                          <TextField
                            id="first-name"
                            label="E-mail:"
                            margin="normal"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <TextField
                            id="first-name"
                            label="Phone:"
                            margin="normal"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          <TextField
                            id="first-name"
                            label="Responce Message:"
                            multiline
                            fullWidth
                            rows={4}
                            value={reqmessage}
                            margin="normal"
                            onChange={(e) => setReqmessage(e.target.value)}
                            required
                          />
                          <Button
                            color="primary"
                            variant="outlined"
                            type="submit"
                            style={{
                              marginTop: "20px",
                              marginBottom: "20px",
                              float: "right",
                              marginRight: "20px",
                            }}
                          >
                            Sent
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductEnquiryScreen;
