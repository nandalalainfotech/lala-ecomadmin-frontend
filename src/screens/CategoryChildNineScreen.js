import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

import { Switch } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormControlLabel from "@mui/material/FormControlLabel";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CategoryMasterallLists,
  deleteCatogry,
} from "../actions/categoryMasterAction";
import { useParams } from "react-router-dom";

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
function CategoryChildNineScreen() {
  const params = useParams();
  const parentId = params.id;
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CategoryMasterallList = useSelector(
    (state) => state.CategoryMasterallList
  );
  const { categorymasterallList } = CategoryMasterallList;

  const [selectionModel, setSelectionModel] = useState([]);

  const editHandler = (id) => {
    navigate(`/testFrom/` + id, { state: { child: "Child8" } });
  };

  const ViewHandeler = (id) => {
    navigate(`/categorychildten/` + id);
  };
  const handleChangeparent = () => {
    // if (e.target.checked === true) {
    //   dispatch(
    //     updateParentEnable({
    //       id: params,
    //       active: e.target.checked,
    //     }),
    //   );
    // } else {
    //   dispatch(
    //     updateParentEnable({
    //       id: params,
    //       deactive: e.target.checked,
    //     }),
    //   );
    // }
  };

  useEffect(() => {
    dispatch(CategoryMasterallLists());
  }, [dispatch]);

  let ChildrenArray = [];

  for (let i = 0; i < categorymasterallList?.length; i++) {
    for (let j = 0; j < categorymasterallList[i].children?.length; j++) {
      for (
        let k = 0;
        k < categorymasterallList[i].children[j].children.length;
        k++
      ) {
        for (
          let A = 0;
          A < categorymasterallList[i].children[j].children[k].children.length;
          A++
        ) {
          for (
            let B = 0;
            B <
            categorymasterallList[i].children[j].children[k].children[A]
              .children.length;
            B++
          ) {
            for (
              let C = 0;
              C <
              categorymasterallList[i].children[j].children[k].children[A]
                .children[B].children.length;
              C++
            ) {
              for (
                let D = 0;
                D <
                categorymasterallList[i].children[j].children[k].children[A]
                  .children[B].children[C].children.length;
                D++
              ) {
                for (
                  let E = 0;
                  E <
                  categorymasterallList[i].children[j].children[k].children[A]
                    .children[B].children[C].children[D].children.length;
                  E++
                ) {
                  if (
                    categorymasterallList[i].children[j].children[k].children[A]
                      .children[B].children[C].children[D].children[E]._id ===
                    parentId
                  ) {
                    for (
                      let F = 0;
                      F <
                      categorymasterallList[i].children[j].children[k].children[
                        A
                      ].children[B].children[C].children[D].children[E].children
                        .length;
                      F++
                    ) {
                      ChildrenArray.push(
                        categorymasterallList[i].children[j].children[k]
                          .children[A].children[B].children[C].children[D]
                          .children[E].children[F]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  let NewArry = [];
  const deleteHandler = (id) => {
    for (let i = 0; i < categorymasterallList?.length; i++) {
      for (let j = 0; j < categorymasterallList[i].children?.length; j++) {
        for (
          let k = 0;
          k < categorymasterallList[i].children[j].children.length;
          k++
        ) {
          for (
            let A = 0;
            A <
            categorymasterallList[i].children[j].children[k].children.length;
            A++
          ) {
            for (
              let B = 0;
              B <
              categorymasterallList[i].children[j].children[k].children[A]
                .children.length;
              B++
            ) {
              for (
                let C = 0;
                C <
                categorymasterallList[i].children[j].children[k].children[A]
                  .children[B].children.length;
                C++
              ) {
                for (
                  let D = 0;
                  D <
                  categorymasterallList[i].children[j].children[k].children[A]
                    .children[B].children[C].children.length;
                  D++
                ) {
                  for (
                    let E = 0;
                    E <
                    categorymasterallList[i].children[j].children[k].children[A]
                      .children[B].children[C].children[D].children.length;
                    E++
                  ) {
                    for (
                      let F = 0;
                      F <
                      categorymasterallList[i].children[j].children[k].children[
                        A
                      ].children[B].children[C].children[D].children[E].children
                        .length;
                      F++
                    ) {
                      if (
                        categorymasterallList[i].children[j].children[k]
                          .children[A].children[B].children[C].children[D]
                          .children[E]._id === parentId
                      ) {
                        if (
                          categorymasterallList[i].children[j].children[k]
                            .children[A].children[B].children[C].children[D]
                            .children[E].children[F]?._id === id
                        ) {
                          NewArry.push({
                            ["parentId"]:
                              categorymasterallList[i].children[j].children[k]
                                .children[A].children[B].children[C].children[D]
                                .children[E].children[F].parentId,
                            ["childId"]: id,
                            ["childname"]: "child-7",
                            ["child1"]: j,
                            ["child2"]: k,
                            ["child3"]: A,
                            ["child4"]: B,
                            ["child5"]: C,
                            ["child6"]: D,
                            ["child7"]: E,
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (window.confirm("Are you sure to delete?")) {
      dispatch(
        deleteCatogry({
          parentId: NewArry[0]?.parentId,
          childId: NewArry[0]?.childId,
          childname: NewArry[0]?.childname,
          child1: NewArry[0]?.child1,
          child2: NewArry[0]?.child2,
          child3: NewArry[0]?.child3,
          child4: NewArry[0]?.child4,
          child5: NewArry[0]?.child5,
          child6: NewArry[0]?.child6,
          child7: NewArry[0]?.child7,
        })
      );
    }
  };

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
  return (
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
        rows={ChildrenArray ? ChildrenArray : ""}
        getRowId={(rows) => rows._id}
        VerticalAlignment="Center"
        //   loading={loading}
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
  );
}

export default CategoryChildNineScreen;
