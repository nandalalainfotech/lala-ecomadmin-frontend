import { makeStyles, Switch } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "../../node_modules/@material-ui/core/index";
import ListItemText from "@mui/material/ListItemText";
import {
  deleteEmployee,
  deleteEmployeeprofile,
  deleteMultipleEmployee,
  EmployeeListDetails,
  ProfileListDetails,
  updateEmployee,
  updateEmployeeactive,
  updateEmployeeEnable,
  updateEmployeeprofile,
} from "../actions/EmployeeAction";
import {
  EMPLOYEE_ACTIVE_UPDATE_RESET,
  EMPLOYEE_DELETE_RESET,
  EMPLOYEE_DETAIL_RESET,
  EMPLOYEE_ENABLE_UPDATE_RESET,
  EMPLOYEE_MULTIPLE_DELETE_RESET,
  EMPLOYEE_PROFLE_DELETE_RESET,
  EMPLOYEE_PROFLE_UPDATE_RESET,
  EMPLOYEE_UPDATE_RESET,
} from "../constants/EmployeeConstants";
import { useForm } from "react-hook-form";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Divider } from "../../node_modules/@material-ui/core/index";

const useStyles = makeStyles({
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

function EmployeeScreen() {
  const classes = useStyles();
  const {
    // register: register1,
    handleSubmit: handleSubmit1,
    // formState: { errors: errors1 },
  } = useForm();

  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  // **************************************
  const AddEmployeeChange = () => {
    navigate("/employee");
  };

  const AddprofileChange = () => {
    navigate("/employeeprofile");
  };

  // ******************************************

  const EmployeeProfile = useSelector((state) => state.EmployeeProfile);
  const { profiledetail } = EmployeeProfile;

  const EmployeeList = useSelector((state) => state.EmployeeList);
  const { employeedetail } = EmployeeList;

  const EmployeeUpdate = useSelector((state) => state.EmployeeUpdate);
  const { success: employeesucee } = EmployeeUpdate;

  const EmployeeDelete = useSelector((state) => state.EmployeeDelete);
  const { success: employedelete } = EmployeeDelete;

  const ProfileUpdate = useSelector((state) => state.ProfileUpdate);
  const { success: profilesucess } = ProfileUpdate;

  const profileDelete = useSelector((state) => state.profileDelete);
  const { success: profiledelete } = profileDelete;

  const EmployeeActive = useSelector((state) => state.EmployeeActive);
  const { success: EmployeeSucces } = EmployeeActive;

  const EmployeeSave = useSelector((state) => state.EmployeeSave);
  const { success: EmployeesavSucces } = EmployeeSave;

  const EnableUpdate = useSelector((state) => state.EnableUpdate);
  const { success: EnableUpdateSucces } = EnableUpdate;

  const Employeemultiple = useSelector((state) => state.Employeemultiple);
  const { success: multideleteSucces } = Employeemultiple;

  // *********************************************
  const [open, setOpen] = useState(false);
  // const [deleteopen, setdeleteopen] = useState(false);

  const handleClickOpen = () => {
    setCheckeddelete(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setdeleteopen(false);
  };

  const [selectionModel, setSelectionModel] = useState([]);
  const [checkedcheck, setChecked] = useState(false);
  const [dchecked, setdisableChecked] = useState(false);
  const [dsablechecked, setdiChecked] = useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setdisableChecked(false);
  };

  const handledisableChange = (event) => {
    setdisableChecked(event.target.checked);
    setChecked(false);
    if (dchecked === dchecked) {
      setdiChecked(false);
    }
  };

  const handleDisClose = () => {
    setOpen(false);
    // setdeleteopen(false);
  };

  const handleClosecheck = () => {
    setOpen(false);
    if (checkedcheck == true) {
      dispatch(
        updateEmployeeactive({
          checkboxId: selectionModel,
          checkedshow: checkedcheck,
        })
      );
      window.confirm("Active Successfully!!");
    } else {
      dispatch(
        updateEmployeeactive({
          checkboxId: selectionModel,
          checkedhide: dsablechecked,
        })
      );
      window.confirm("De-Active Successfully!!");
    }
  };
  // *********************Delete Multiple**********************
  const [checkeddelete, setCheckeddelete] = useState(false);

  // const handleClickdelete = () => {
  //   setdeleteopen(true);
  //   setCheckeddelete(false);
  // };

  const handleChangedelete = (event) => {
    setCheckeddelete(event.target.checked);
  };

  const handleClosecheckdelet = () => {
    setOpen(false);
    // setdeleteopen(false);
    if (checkeddelete == true) {
      dispatch(deleteMultipleEmployee({ id: selectionModel }));
    }
  };
  // **************************************
  // ********************************************************

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    setEditId("");
    setEditemployeeProfileId("");
  };

  //   Save Button Section********************

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClosechcke = () => {
    setAnchorEl2(null);
  };

  // **************************Update section*************************
  const [EditId, setEditId] = useState("");
  const [Editfirstname, setEditfirstname] = useState("");
  const [Editlastname, setEditlastname] = useState("");
  const [Editemail, setEditemail] = useState("");
  const [Editmobile, setEditmobile] = useState("");
  const [Editprofile, setEditprofile] = useState("");
  const [EditActive, setEditActive] = useState("");
  const [password, setpassword] = useState("");

  const editEmployeeDetails = (params) => {
    setEditId(params._id);
    setEditfirstname(params.firstname);
    setEditlastname(params.lastname);
    setEditemail(params.email);
    setEditmobile(params.mobile);
    setEditprofile(params.profile);
    setEditActive(params.active);
    setpassword(params.password);
  };

  const Updatehandele = () => {
    dispatch(
      updateEmployee({
        id: EditId,
        fname: Editfirstname,
        lname: Editlastname,
        editemail: Editemail,
        mobilenumber: Editmobile,
        roll: Editprofile,
        active: EditActive,
        password: password,
      })
    );
    window.confirm("Employee Details Update Successfully!!");
    setEditId("");
    setEditfirstname("");
    setEditlastname("");
    setEditemail("");
    setEditmobile("");
    setEditprofile("");
    setEditActive("");
    setpassword("");
  };
  const [EditemployeeProfileId, setEditemployeeProfileId] = useState("");
  const [EditemployeeProfile, setEditemployeeProfile] = useState("");

  const editEmployeeProfile = (params) => {
    setEditemployeeProfileId(params._id);
    setEditemployeeProfile(params.empprofile);
  };
  const UpdateProfile = () => {
    dispatch(
      updateEmployeeprofile({
        id: EditemployeeProfileId,
        profil: EditemployeeProfile,
      })
    );
    window.confirm("Employee Details Update Successfully!!");
    setEditemployeeProfileId("");
    setEditemployeeProfile("");
  };

  // *******************************Delete Section********************************
  // deleteMultipleEmployee

  const deletevalueHandler = (employee) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteEmployee(employee.row._id));
    }
  };

  const deleteProfileHandler = (profile) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteEmployeeprofile(profile.row._id));
    }
  };
  // *****************************************************************
  useEffect(() => {
    if (multideleteSucces) {
      dispatch({ type: EMPLOYEE_MULTIPLE_DELETE_RESET });
    }

    if (EnableUpdateSucces) {
      dispatch({ type: EMPLOYEE_ENABLE_UPDATE_RESET });
    }
    if (EmployeesavSucces) {
      dispatch({ type: EMPLOYEE_DETAIL_RESET });
    }

    if (EmployeeSucces) {
      dispatch({ type: EMPLOYEE_ACTIVE_UPDATE_RESET });
    }
    if (employeesucee) {
      dispatch({ type: EMPLOYEE_UPDATE_RESET });
    }
    if (employedelete) {
      dispatch({ type: EMPLOYEE_DELETE_RESET });
    }

    if (profilesucess) {
      dispatch({ type: EMPLOYEE_PROFLE_UPDATE_RESET });
    }
    if (profiledelete) {
      dispatch({ type: EMPLOYEE_PROFLE_DELETE_RESET });
    }

    dispatch(EmployeeListDetails());
    dispatch(ProfileListDetails());
  }, [
    dispatch,
    employeesucee,
    employedelete,
    profilesucess,
    profiledelete,
    EmployeeSucces,
    EnableUpdateSucces,
    multideleteSucces,
  ]);

  // ******************data grid************************
  const handleChangedata = (e, params) => {
    if (e.target.checked === true) {
      dispatch(
        updateEmployeeEnable({
          id: params,
          active: e.target.checked,
        })
      );
    } else {
      dispatch(
        updateEmployeeEnable({
          id: params,
          deactive: e.target.checked,
        })
      );
    }
  };

  function getprofileId(params) {
    return `${
      params?.row?.profile
        ? profiledetail?.find((x) => x?._id === params?.row?.profile)
            ?.empprofile
        : ""
    }`;
  }

  const employee = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography sx={{ fontSize: 13 }}>{params.row.firstname}</Typography>
        );
      },
    },
    {
      field: "lastname",
      headerName: "Last Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography sx={{ fontSize: 13 }}>{params.row.lastname}</Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography sx={{ fontSize: 13 }}>{params.row.email}</Typography>
        );
      },
    },
    {
      field: "mobile",
      headerName: "Mobile Number",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography sx={{ fontSize: 13 }}>{params.row.mobile}</Typography>
        );
      },
    },
    {
      field: "profile",
      headerName: "Profile",
      flex: 1,
      headerClassName: "super-app-theme--header",
      valueGetter: getprofileId,
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (params.row.active === true) {
          return (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  className={classes.switch}
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
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editEmployeeDetails(params.row)}
            style={{
              color: "#993399",
              fontSize: 20,
              margin: 20,
              cursor: "pointer",
            }}
          />
          <DeleteIcon
            onClick={() => deletevalueHandler(params)}
            style={{ color: "#FF3333", fontSize: 20, cursor: "pointer" }}
          />
        </>
      ),
    },
    // {
    //   field: "",
    //   headerName: "Delete",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (params) => (
    //     <>
    //       <DeleteIcon
    //         onClick={() => deletevalueHandler(params)}
    //         style={{ color: "#FF3333", fontSize: 20, cursor: "pointer" }}
    //       />
    //     </>
    //   ),
    // },
  ];
  const [age, setAge] = useState("");
  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };

  const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const [personName, setPersonName] = useState([]);

  const handleChangeCheckbox = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },
    {
      field: "empprofile",
      headerName: "Profile Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography sx={{ fontSize: 13 }}>{params.row.empprofile}</Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editEmployeeProfile(params.row)}
            style={{
              color: "#993399",
              fontSize: 20,
              margin: 20,
              cursor: "pointer",
            }}
          />
          <DeleteIcon
            onClick={() => deleteProfileHandler(params)}
            style={{
              color: "#FF3333",
              fontSize: 20,
              margin: 20,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
  ];

  // const [ProfileId, setProfileId] = useState();
  // console.log("newbrandId-------->", newbrandId)

  return (
    <>
      <>
        {tabIndex === 0 && (
          <>
            <Typography variant="h6" sx={{ mt: -2, mb: 1 }}>
              Employee Details
            </Typography>
            <Box sx={{ display: "flex", flexDerection: "row", mt: -1 }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ display: "flex", flexDerection: "row", mb: 1 }}
              >
                <Link
                  to="/"
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "12px",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>Home</Typography>
                </Link>
                <Typography sx={{ fontSize: "14px" }}>
                  {" "}
                  Employee Details
                </Typography>
              </Breadcrumbs>

              <Box sx={{ ml: "auto" }}>
                <Button
                  variant="contained"
                  sx={{
                    mr: 3,
                    mt: -2,
                    borderRadius: "20px",
                    backgroundColor: "#00A787",
                    "&:hover": {
                      backgroundColor: "#00A787",
                    },
                    fontSize: 12,
                  }}
                  onClick={AddEmployeeChange}
                >
                  Add New Employee Details
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 1 }} />
          </>
        )}

        {tabIndex === 1 && (
          <>
            <Typography variant="h6" sx={{ mt: -2, mb: 1 }}>
              Employee Profile
            </Typography>
            <Box sx={{ display: "flex", flexDerection: "row", mt: -1 }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ display: "flex", flexDerection: "row", mb: 1 }}
              >
                <Link
                  to="/"
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "12px",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>Home</Typography>
                </Link>
                <Typography sx={{ fontSize: "14px" }}>
                  {" "}
                  Employee Profile
                </Typography>
              </Breadcrumbs>

              <Box sx={{ ml: "auto" }}>
                <Button
                  variant="contained"
                  sx={{
                    mr: 3,
                    mt: -2,
                    borderRadius: "20px",
                    backgroundColor: "#00A787",
                    "&:hover": {
                      backgroundColor: "#00A787",
                    },
                    fontSize: 12,
                  }}
                  onClick={AddprofileChange}
                >
                  Add New Profile
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 1 }} />
          </>
        )}
        {tabIndex === 2 && (
          <>
            {/* <Typography variant="h6" sx={{ mt: 0, ml: 2 }}>
              Employee Permission
            </Typography>
            <Box sx={{ display: "flex", mt: 0, ml: 2 }}>
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

                <Typography sx={{ fontSize: "13px" }}>
                  Employee Permission
                </Typography>
              </Breadcrumbs>
            </Box> */}
            <Typography variant="h6" sx={{ mt: -2, mb: 1 }}>
              Employee Permission
            </Typography>
            <Box sx={{ display: "flex", flexDerection: "row", mt: -1 }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ display: "flex", flexDerection: "row", mb: 1 }}
              >
                <Link
                  to="/"
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "12px",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>Home</Typography>
                </Link>
                <Typography sx={{ fontSize: "14px" }}>
                  {" "}
                  Employee Permission
                </Typography>
              </Breadcrumbs>

              {/* <Box sx={{ ml: "auto" }}>
                <Button
                  variant="contained"
                  sx={{
                    mr: 3,
                    mt: -2,
                    borderRadius: "20px",
                   backgroundColor: "#00A787",
                            "&:hover": {
                              backgroundColor: "#00A787",
                            },
                    fontSize: 12,
                  }}
                  onClick={AddprofileChange}
                >
                  Add New Profile
                </Button>
              </Box> */}
            </Box>
            <Divider sx={{ mt: 1 }} />
          </>
        )}
      </>
      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="#00A787"
        >
          <Tab
            style={{
              fontSize: "13px",
              color: tabIndex === 0 ? "#00A787" : "inherit",
              borderBottom:
                tabIndex === 0 ? "2px solid #00A787" : "2px solid transparent",
            }}
            label="Employees"
          />
          <Tab
            style={{
              fontSize: "13px",
              color: tabIndex === 1 ? "#00A787" : "inherit",
              borderBottom:
                tabIndex === 1 ? "2px solid #00A787" : "2px solid transparent",
            }}
            label="Profiles"
          />
          <Tab
            style={{
              fontSize: "13px",
              color: tabIndex === 2 ? "#00A787" : "inherit",
              borderBottom:
                tabIndex === 3 ? "2px solid #00A787" : "2px solid transparent",
            }}
            label="Permission"
          />
        </Tabs>

        {tabIndex === 0 && (
          <>
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
                }}
                variant="contained"
                onClick={handleClickOpen}
              >
                Bulk
              </Button>

              {/* <Button
                sx={{
                  mr: 3,
                  mt: 2,
                  mb: 0,

                  borderRadius: "20px",
                  backgroundColor: "#0099CC",
                }}
                variant='contained'
                onClick={handleClickdelete}
              >
                Bulk Delete
              </Button> */}
            </Box>
            <Box>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Select One</DialogTitle>
                <DialogContent>
                  <FormControlLabel
                    label="Show All"
                    control={
                      <Checkbox
                        checked={checkedcheck}
                        onChange={handleChange}
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
                        checked={dchecked}
                        onChange={handledisableChange}
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
                    onClick={handleDisClose}
                    style={{
                      color: "#00A787",
                      "&:hover": { color: "#00A787" },
                    }}
                  >
                    Cancel
                  </Button>

                  {checkeddelete === true ? (
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
                        onClick={handleClosecheck}
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
            {/* <Box>
              <Dialog open={deleteopen} onClose={handleClose}>
                <DialogTitle>Select One</DialogTitle>
                <DialogContent>
                  <FormControlLabel
                    label='Delete All'
                    control={
                      <Checkbox
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
                  <Button autoFocus onClick={handleDisClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleClosecheckdelet} autoFocus>
                    Done
                  </Button>
                </DialogActions>
              </Dialog>
            </Box> */}

            {EditId ? (
              <Box>
                <Box>
                  <ThemeProvider theme={theme}>
                    <Container
                      component="main"
                      maxWidth="sm"
                      sx={{
                        my: { xs: 3, md: 6, lg: 10 },
                        p: { xs: 2, md: 1 },
                      }}
                    >
                      <CssBaseline />
                      <Box
                        onSubmit={handleSubmit1(Updatehandele)}
                        component="form"
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                          alignItems: "center",
                          borderRadius: "0px",
                          p: 5,
                          border: "1px solid #000000",
                        }}
                      >
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                          {" "}
                          Update Employee Details
                        </Typography>
                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          id="First Name"
                          label="First Name"
                          name="fname"
                          autoComplete="off"
                          value={Editfirstname}
                          onChange={(e) => setEditfirstname(e.target.value)}
                        />

                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          id="Last Name"
                          label="Last Name"
                          name="lname"
                          autoComplete="off"
                          value={Editlastname}
                          onChange={(e) => setEditlastname(e.target.value)}
                        />

                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          id="Email"
                          label="Email"
                          name="email"
                          autoComplete="off"
                          value={Editemail}
                          onChange={(e) => setEditemail(e.target.value)}
                        />

                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          id="Number"
                          label="Password"
                          name="Password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />

                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          id="Number"
                          label="Mobile Number"
                          name="mnumber"
                          autoComplete="off"
                          value={Editmobile}
                          onChange={(e) => setEditmobile(e.target.value)}
                        />

                        <FormControl fullWidth sx={{ mt: 1 }}>
                          <InputLabel>Profile</InputLabel>
                          <Select
                            id="standard-simple-select"
                            value={Editprofile}
                            label="Attributes Type"
                            onChange={(e) => setEditprofile(e.target.value)}
                          >
                            {profiledetail?.map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.empprofile}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 1 }}>
                          <InputLabel>Active</InputLabel>
                          <Select
                            id="standard-simple-select"
                            value={EditActive}
                            label="Attributes Type"
                            onChange={(e) => setEditActive(e.target.value)}
                          >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </Select>
                        </FormControl>
                        <Box sx={{ display: "flex" }}>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 3,
                              mb: 2,
                              ml: 5,
                              borderRadius: "20px",
                              backgroundColor: "#00A787",
                              "&:hover": {
                                backgroundColor: "#00A787",
                              },
                            }}
                            type="submit"
                          >
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  height: 325,
                  width: "100%",

                  "& .super-app-theme--header": {
                    backgroundColor: "#808080",
                    color: "#ffffff",
                  },
                  "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                    fontSize: 14,
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
                  columns={employee}
                  rows={employeedetail ? employeedetail : ""}
                  getRowId={(rows) => rows._id}
                  VerticalAlignment="Center"
                  rowHeight={40}
                  headerHeight={35}
                  // pageSize={10}
                  // rowsPerPageOptions= {[25, 50, 100]}
                  pagination
                  checkboxSelection
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                />
              </Box>
            )}
          </>
        )}

        {tabIndex === 1 && (
          <>
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
              }}
              variant="contained"
              onClick={(e) => setAnchorEl2(e.currentTarget)}
            >
              Bulk
            </Button>
            <Menu
              id="simple-menu2"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleClosechcke}
              MenuListProps={{ onMouseLeave: handleClosechcke }}
            >
              <MenuItem onClick={handleClosechcke}>Select All</MenuItem>
              <MenuItem onClick={handleClosechcke}>De-Select</MenuItem>
            </Menu>
            {EditemployeeProfileId ? (
              <Box>
                <Box>
                  <ThemeProvider theme={theme}>
                    <Container
                      component="main"
                      maxWidth="sm"
                      sx={{
                        my: { xs: 3, md: 6, lg: 10 },
                        p: { xs: 2, md: 1 },
                      }}
                    >
                      <CssBaseline />

                      <Box
                        onSubmit={handleSubmit(UpdateProfile)}
                        component="form"
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                          alignItems: "center",
                          borderRadius: "0px",
                          p: 5,
                          mt:-7,
                          mb:-10,
                          border: "1px solid #000000",
                        }}
                      >
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                          {" "}
                          Update Profile
                        </Typography>
                        <TextField
                          size="small"
                          margin="normal"
                          fullWidth
                          id="profile"
                          label="Profile"
                          name="profile"
                          autoComplete="off"
                          value={EditemployeeProfile}
                          onChange={(e) =>
                            setEditemployeeProfile(e.target.value)
                          }
                        />

                        <Box sx={{ display: "flex" }}>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 3,
                              mb: 2,
                              ml: 5,
                              borderRadius: "20px",
                              backgroundColor: "#00A787",
                              "&:hover": {
                                backgroundColor: "#00A787",
                              },
                            }}
                            type="submit"
                          >
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  height: 325,
                  width: "100%",

                  "& .super-app-theme--header": {
                    backgroundColor: "#808080",
                    color: "#ffffff",
                    textAlign: "center",
                  },
                  "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                    fontSize: 14,
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
                  rows={profiledetail ? profiledetail : ""}
                  getRowId={(rows) => rows._id}
                  VerticalAlignment="Center"
                  rowHeight={40}
                  headerHeight={35}
                  // pageSize={10}
                  // rowsPerPageOptions= {[25, 50, 100]}
                  pagination
                  checkboxSelection
                />
              </Box>
            )}
          </>
        )}

        {tabIndex === 2 && (
          <>
            {/* <Box>
              <Button
                sx={{
                  mr: 3,
                  mt: 0,
                  mb: 0,
                  ml: 1.5,
                  borderRadius: "20px",
                  backgroundColor: "#00A787",
                            "&:hover": {
                              backgroundColor: "#00A787",
                            },
                }}
                variant="contained"
                onClick={(e) => setAnchorEl2(e.currentTarget)}
              >
                Bulk
              </Button>
              <Menu
                id="simple-menu2"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClosechcke}
                MenuListProps={{ onMouseLeave: handleClosechcke }}
              >
                <MenuItem onClick={handleClosechcke}>Select All</MenuItem>
                <MenuItem onClick={handleClosechcke}>De-Select</MenuItem>
              </Menu>
            </Box> */}
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: 300, marginTop: "20px" }}>
                <h5 style={{ padding: 5 }}>User Role:</h5>
                <Select
                  style={{ width: "250px", height: "40px" }}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  onChange={handleChangedrop}
                  displayEmpty
                >
                  {profiledetail?.map((name) => (
                    <MenuItem key={name} value={name._id}>
                      <ListItemText primary={name?.empprofile} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ width: 300, marginTop: "20px" }}>
                <h5 style={{ padding: 5 }}>Sales Staff Permission : </h5>
                <Select
                  style={{ width: "250px", height: "40px" }}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChangeCheckbox}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names?.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  ml: 0,
                  borderRadius: "20px",
                  backgroundColor: "#00A787",
                  "&:hover": {
                    backgroundColor: "#00A787",
                  },
                }}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default EmployeeScreen;
