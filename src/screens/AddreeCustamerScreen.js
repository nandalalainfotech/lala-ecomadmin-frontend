import { Switch } from "@material-ui/core";
import { deepPurple, red } from "@material-ui/core/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "../../node_modules/react-redux/es/exports";
import {
  customerAddressList,
  deleteMultipleaddress,
  deletecustomerAddress,
  updatecustomeraddressEnable,
  updatecustomeraddressactive,
} from "../actions/customerAction";
import { AddressBillList } from "../actions/addressActions";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Divider } from "../../node_modules/@material-ui/core/index";
import { makeStyles } from "../../node_modules/@material-ui/styles/index";
import {
  CUSTOMER_ADDRESS_BULK_DELETE_RESET,
  CUSTOMER_ADDRESS_ENABLE_UPDATE_RESET,
  CUSTOMER_PRODUCT_ACTIVE_UPDATE_RESET,
} from "../constants/customerConstant";

const useStyles1 = makeStyles({
  switch: {
    "& .Mui-checked": {
      color: "#00CC00",
      // transform: "translateX(25px) !important"
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#00CC00 !important",
    },
  },
});

function AddreeCustamerScreen() {
  const customAddressList = useSelector((state) => state.customAddressList);
  const { custAddList } = customAddressList;

  const customerAddressdelete = useSelector(
    (state) => state.customerAddressdelete
  );
  const { success: deleteall } = customerAddressdelete;
  // const AddressList = useSelector((state) => state.AddressList);
  // const { Adddatum } = AddressList;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const swicclasses = useStyles1();
  const [details, setDetails] = useState([]);

  const CustomAdditem = () => {
    navigate("/addressreg");
  };
  const customerAddressActive = useSelector(
    (state) => state.customerAddressActive
  );
  const { success: activesucess } = customerAddressActive;
  const customeraddressEnable = useSelector(
    (state) => state.updatecustomeraddressEnable
  );
  const { success: successpro } = customeraddressEnable;

  useEffect(() => {
    dispatch(customerAddressList());
    dispatch(AddressBillList());
  }, []);
  useEffect(() => {
    if (custAddList) {
      setDetails(custAddList);
    }
    if (activesucess) {
      dispatch({ type: CUSTOMER_PRODUCT_ACTIVE_UPDATE_RESET });
      dispatch(customerAddressList());
    }
    if (successpro) {
      dispatch({ type: CUSTOMER_ADDRESS_ENABLE_UPDATE_RESET });
      dispatch(customerAddressList());
    }
    if (deleteall) {
      dispatch({ type: CUSTOMER_ADDRESS_BULK_DELETE_RESET });
      dispatch(customerAddressList());
    }
  }, [custAddList, activesucess, deleteall, successpro]);

  const editHandler = (cusAddIndId) => {
    navigate("/addressreg/" + cusAddIndId);
  };

  const deleteHandler = (params) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deletecustomerAddress(params.row._id));
    }
  };
  const handleChangedata = (e, params) => {
    if (e.target.checked === true) {
      dispatch(
        updatecustomeraddressEnable({
          id: params,
          active: e.target.checked,
        })
      );
    } else {
      dispatch(
        updatecustomeraddressEnable({
          id: params,
          deactive: e.target.checked,
        })
      );
    }
  };

  const columns = [
    // {
    //   field: "custEmail",
    //   headerName: "Customer Email",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "identificationNo",
    //   headerName: "Identification Number",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "addresAlias",
    //   headerName: "Address alias",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "fname",
      headerName: "First name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "lname",
    //   headerName: "Last name",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "company",
    //   headerName: "Company",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "vatNo",
    //   headerName: "VAT number",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "Addres2",
    //   headerName: "Address 2",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "zip",
    //   headerName: "Zip/Postal code",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },

    {
      field: "city",
      headerName: "City",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "mobile",
    //   headerName: "Mobile phone",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "other",
    //   headerName: "Other",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "checked",
      headerName: "Displayed",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        if (params.row.status === true) {
          return (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  className={swicclasses.switch}
                  checked
                  onClick={(e) => handleChangedata(e, params.row._id)}
                />
              }
            />
          );
        } else {
          return (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  onClick={(e) => handleChangedata(e, params.row._id)}
                />
              }
            />
          );
        }
      },
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editHandler(params.row._id)}
            style={{
              color: deepPurple[500],
              fontSize: 15,
              margin: 20,
              cursor: "pointer",
            }}
          />

          <DeleteIcon
            onClick={() => deleteHandler(params)}
            style={{ color: red[500], fontSize: 15, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [checkeddelete, setCheckeddelete] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [valueopen, setvalueOpen] = useState(false);
  const [valuecheckedcheck, setvalueChecked] = useState(false);
  const [valuedchecked, setvaluedisableChecked] = useState(false);
  const [valeselectionModel, setvalueSelectionModel] = useState([]);
  const [valuedsablechecked, setvaluediChecked] = useState("");
  const handleClickvalueOpen = () => {
    setCheckeddelete(false);
    setvalueOpen(true);
  };

  const handlevalueClose = () => {
    setvalueOpen(false);
  };

  const handleChangevalue = (event) => {
    setvalueChecked(event.target.checked);
    setvaluedisableChecked(false);
  };

  const handlevaluedisableChange = (event) => {
    setvaluedisableChecked(event.target.checked);
    setvalueChecked(false);
    if (valuedchecked === valuedchecked) {
      setvaluediChecked(false);
    }
  };

  const handleChangedelete = (event) => {
    setCheckeddelete(event.target.checked);
  };

  const handlevalueDisClose = () => {
    setvalueOpen(false);
  };
  const handleClosecheckdelet = () => {
    setvalueOpen(false);
    if (checkeddelete == true) {
      dispatch(deleteMultipleaddress({ id: valeselectionModel }));
    }
  };
  const handlevlaueClosecheck = () => {
    setvalueOpen(false);
    if (valuecheckedcheck === true) {
      dispatch(
        updatecustomeraddressactive({
          checkboxId: valeselectionModel,
          checkedshow: valuecheckedcheck,
        })
      );
      window.confirm("Active Successfully!!");
    } else {
      dispatch(
        updatecustomeraddressactive({
          checkboxId: valeselectionModel,
          checkedhide: valuedsablechecked,
        })
      );
      window.confirm("De-Active Successfully!!");
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: -2 }}>
        Customer Address
      </Typography>
      <Box sx={{ display: "flex", mt: 0 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mt: 1, mb: 1 }}
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

          <Typography sx={{ fontSize: "13px" }}>Customer Address</Typography>
        </Breadcrumbs>
        <Box sx={{ ml: "auto", mt: -3 }}>
          <Button
            sx={{
              mr: 3,
              borderRadius: "20px",
              backgroundColor: "#00A787",
              "&:hover": {
                backgroundColor: "#00A787",
              },
              fontSize: 12,
            }}
            variant="contained"
            onClick={CustomAdditem}
          >
            Add new addresses
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box sx={{ display: "flex" }}>
        <Button
          sx={{
            mr: 3,
            mt: 1,
            mb: -1,
            borderRadius: "20px",
            backgroundColor: "#00A787",
            "&:hover": {
              backgroundColor: "#00A787",
            },
            fontSize: 12,
          }}
          size="small"
          variant="contained"
          onClick={handleClickvalueOpen}
        >
          Bulk
        </Button>
      </Box>

      <Box>
        <Dialog open={valueopen} onClose={handlevalueClose}>
          <DialogTitle>Select One</DialogTitle>
          <DialogContent>
            <FormControlLabel
              label="Show All"
              control={
                <Checkbox
                  size="small"
                  checked={valuecheckedcheck}
                  onChange={handleChangevalue}
                  inputProps={{
                    "aria-label": "controlled",
                  }}
                />
              }
            />

            <FormControlLabel
              label="Hide All"
              control={
                <Checkbox
                  size="small"
                  checked={valuedchecked}
                  onChange={handlevaluedisableChange}
                  inputProps={{
                    "aria-label": "controlled",
                  }}
                />
              }
            />
            <FormControlLabel
              label="Delete All"
              control={
                <Checkbox
                  size="small"
                  checked={checkeddelete}
                  onChange={handleChangedelete}
                  inputProps={{
                    "aria-label": "controlled",
                  }}
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handlevalueDisClose}
              style={{
                color: "#00A787",
                "&:hover": { color: "#00A787" },
              }}
            >
              Cancel
            </Button>
            {checkeddelete == true ? (
              <>
                {" "}
                <Button
                  onClick={handleClosecheckdelet}
                  autoFocus
                  style={{
                    color: "#00A787",
                    "&:hover": { color: "#00A787" },
                  }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handlevlaueClosecheck}
                  autoFocus
                  style={{
                    color: "#00A787",
                    "&:hover": { color: "#00A787" },
                  }}
                >
                  Done
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>

      <Box
        sx={{
          height: 360,
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
          rows={details ? details : ""}
          getRowId={(rows) => rows._id}
          VerticalAlignment="Center"
          rowHeight={40}
          headerHeight={35}
          pagination
          // pageSize={10}
          // rowsPerPageOptions={[25, 50, 100]}

          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setvalueSelectionModel(newSelectionModel);
          }}
        />
      </Box>
    </>
  );
}

export default AddreeCustamerScreen;
