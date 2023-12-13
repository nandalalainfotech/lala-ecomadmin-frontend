import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

import { makeStyles, Switch } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CategoryMasterallLists,
  deleteCategegoryMasterlist,
  deleteMultipleParent,
  updatecategoryActivate,
  updateParentEnable,
} from "../actions/categoryMasterAction";
import {
  CATEGORY_MASTER_DEL_RESET,
  CATEGORY_UPDATES_RESET,
  PARENT_MULTIPLE_DELETE_RESET,
} from "../constants/categoryMasterConstant";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  switch: {
    "& .Mui-checked": {
      color: "#00CC00",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#00CC00 !important",
    },
  },
});

export default function CategoryMasterScreen() {
  const classes = useStyles();
  const CategoryMasterallList = useSelector(
    (state) => state.CategoryMasterallList
  );
  const { categorymasterallList, loading } = CategoryMasterallList;

  const CategoryMasterDelete = useSelector(
    (state) => state.CategoryMasterDelete
  );
  const { success: successDelete } = CategoryMasterDelete;

  const categoryCheckbox = useSelector((state) => state.categoryCheckbox);
  const { success: successcheckbox } = categoryCheckbox;

  const EnableParent = useSelector((state) => state.EnableParent);
  const { success: successParent } = EnableParent;

  const parentDelete = useSelector((state) => state.parentDelete);
  const { success: successparentDelete } = parentDelete;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [view, setView] = useState();

  const submitHandler = () => {
    navigate("/categoryFormmaster");
  };

  useEffect(() => {
    if (successparentDelete) {
      dispatch({ type: PARENT_MULTIPLE_DELETE_RESET });
    }

    if (successParent) {
      dispatch({ type: CATEGORY_UPDATES_RESET });
    }

    if (successcheckbox) {
      dispatch({ type: CATEGORY_UPDATES_RESET });
    }

    if (successDelete) {
      dispatch({ type: CATEGORY_MASTER_DEL_RESET });
    }
    dispatch(CategoryMasterallLists());
  }, [
    dispatch,
    successDelete,
    successcheckbox,

    successParent,

    successparentDelete,
  ]);

  const editHandler = (id) => {
    navigate(`/testFrom/` + id, { state: { child: "Parent" } });
  };

  const ViewHandeler = (id) => {
    navigate(`/categorychildtwo/` + id);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCategegoryMasterlist(id));
    }
  };
  // const handleClickOpen = (e) => {
  //   setNewimg(e.target.src);
  //   setOpen(true);
  // };

  // ********************************Enable Disable section********************************
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectionModel, setSelectionModel] = useState([]);
  // setCheckboxSelection
  const [checked, setChecked] = useState(false);
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

  const handleClickOpen = () => {
    setCheckeddelete(false);
    setOpen(true);
    setChecked(false);
    setdisableChecked(false);
  };

  const handleDisClose = () => {
    // setdeleteopen(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    if (checked === true) {
      dispatch(
        updatecategoryActivate({
          checkboxId: selectionModel,
          checkedshow: checked,
        })
      );
    } else {
      dispatch(
        updatecategoryActivate({
          checkboxId: selectionModel,
          checkedhide: dsablechecked,
        })
      );
    }
  };

  // *************************************Child Data grid******************************************************

  // *******************************************Grand Child Data Grid**************************************

  const handleChangeparent = (e, params) => {
    if (e.target.checked === true) {
      dispatch(
        updateParentEnable({
          id: params,
          active: e.target.checked,
        })
      );
    } else {
      dispatch(
        updateParentEnable({
          id: params,
          deactive: e.target.checked,
        })
      );
    }
  };

  // ***********************************Multi Delete Screen*****************************************
  // ***********************Multy Delete Sectiion*********************************************

  const [checkeddelete, setCheckeddelete] = useState(false);

  const handleChangedelete = (event) => {
    setCheckeddelete(event.target.checked);
  };

  const handleClosecheckdelet = () => {
    setOpen(false);
    if (checkeddelete == true) {
      dispatch(deleteMultipleParent({ id: selectionModel }));
    }
  };
  // *****************************Attr value Multidelete section****************************************

  // *******************************************************************

  // /********************************************data grid Section**********************/
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      dataKey: "serial",
      headerClassName: "super-app-theme--header",
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
      flex: 1,
    },
    // {
    //   field: "imageFile",
    //   headerName: "Images",
    //   flex: 1,
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (params) => {
    //     return (
    //       <Avatar
    //         // onClick={handleClickOpen}
    //         sx={{ height: "50px", width: "50px", cursor: "pointer" }}
    //         src={`/api/brand/show/${params.row.coverimg}`}
    //         alt={params.row.coverimg}
    //       />
    //     );
    //   },
    // },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params) => {
        return <Typography sx={{ fontSize: 13 }}>{params.row.name}</Typography>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "super-app-theme--header",
      flex: 1,
      editable: true,
    },
    {
      field: "checked",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: (params) => {
        if (params.row.checked === true) {
          return (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  className={classes.switch}
                  // color="#00CC00"
                  checked
                  onClick={(e) => handleChangeparent(e, params.row._id)}
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
                  onClick={(e) => handleChangeparent(e, params.row._id)}
                />
              }
            />
          );
        }
      },
    },
    {
      field: "parent",
      headerName: "View ",

      editable: true,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <VisibilityIcon
            onClick={() => ViewHandeler(params.row._id)}
            style={{
              color: "#FF0066",
              fontSize: 20,
              margin: 20,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => editHandler(params.row._id)}
            style={{
              color: "#993399",
              fontSize: 20,
              margin: 20,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
    {
      field: "viwe",
      headerName: "Delete",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <>
          <DeleteIcon
            onClick={() => deleteHandler(params.row._id)}
            style={{
              color: "#FF0033",
              fontSize: 20,
              margin: 20,
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
  ];

  // ****************************child data grid*********************************

  // ****************************Grand Children*********************************

  return (
    <Box>
      <Typography variant="h6" sx={{ mt: -2, mb: 1 }}>
        Category
      </Typography>
      <Box sx={{ display: "flex", flexDerection: "row", mt: -1 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ display: "flex", flexDerection: "row", mb: 2 }}
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
          <Typography sx={{ fontSize: "14px" }}>Category</Typography>
        </Breadcrumbs>

        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            sx={{
              mr: 3,
              mt: -2,
              borderRadius: "20px",
              backgroundColor: "#00A787",
              "&:hover": { backgroundColor: "#00A787" },
              fontSize: 12,
            }}
            onClick={submitHandler}
          >
            <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
            Add New Category
          </Button>
        </Box>
      </Box>
      <Divider />

      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              mr: 3,
              mt: 2,
              mb: 0,
              borderRadius: "20px",
              backgroundColor: "#00A787",
              "&:hover": {
                backgroundColor: "#00A787",
              },
              fontSize: 12,
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Bulk
          </Button>
        </Box>
        <Box>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleDisClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Selected One"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <FormControlLabel
                  label="Show All"
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                />

                <FormControlLabel
                  label="Hide All"
                  control={
                    <Checkbox
                      checked={dchecked}
                      onChange={handledisableChange}
                      inputProps={{ "aria-label": "controlled" }}
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
              </DialogContentText>
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
                    onClick={handleClose}
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
          {/* <Dialog open={deleteopen} onClose={handleDeletrClose}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
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
            </DialogContent> */}
        {/* <DialogActions>
              <Button autoFocus onClick={handleDeletrClose}>
                Cancel
              </Button>
              <Button onClick={handleClosecheckdelet} autoFocus>
                Done
              </Button>
            </DialogActions>
          </Dialog> */}
        {/* </Box> */}
        <Box
          sx={{
            height: 360,
            width: "100%",

            "& .super-app-theme--header": {
              backgroundColor: "#808080",
              color: "#ffffff",
            },
            "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
              fontSize: 14,
            },
            ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
              fontSize: 12,
            },
            ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
              {
                backgroundColor: "#808080",
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
            rows={categorymasterallList ? categorymasterallList : ""}
            getRowId={(rows) => rows._id}
            VerticalAlignment="Center"
            loading={loading}
            rowHeight={40}
            headerHeight={35}
            //   pageSize={pageSize}
            //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // rowsPerPageOptions={[5, 10, 20]}
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
      </Box>
    </Box>
  );
}
