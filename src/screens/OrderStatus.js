import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { StatuslistOrderMine, deleteStatus } from "../actions/StatusAction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Divider } from "../../node_modules/@material-ui/core/index";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ORDER_STATUS_DELETE_RESET } from "../constants/orderConstants";
export default function OrderStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statusDlete = useSelector((state) => state.statusDlete);
  const { success: deleted } = statusDlete;

  useEffect(() => {
    if (deleted) {
      dispatch({ type: ORDER_STATUS_DELETE_RESET });
    }
    dispatch(StatuslistOrderMine());
  }, [dispatch, deleted]);
  const deleteHandler = (id) => {
    console.log("id", id);
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteStatus(id));
    }
  };
  const statuslist = useSelector((state) => state.statuslist);
  const { statusdatum } = statuslist;
  console.log("statusdatum", statusdatum);
  const onProdctChange = () => {
    navigate(`/orderstatuslist/`);
  };
  return (
    <div>
      <>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ mt: -1 }}>
            Order Status
          </Typography>
          <Box sx={{ display: "flex", mt: 4, ml: -16 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                to="/"
                style={{
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: "15px",
                }}
              >
                <Typography>Home</Typography>
              </Link>

              <Typography sx={{ fontSize: "15px" }}>Order Status</Typography>
            </Breadcrumbs>
          </Box>
          <Divider sx={{ mt: 4 }} />
          <Box sx={{ ml: "auto" }}>
            <Button
              variant="contained"
              sx={{
                mr: 3,
                mt: -1,
                borderRadius: "20px",
                backgroundColor: "#00A787",
                "&:hover": {
                  backgroundColor: "#00A787",
                },
                fontSize: 12,
              }}
              onClick={onProdctChange}
            >
              <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
              Add New Status
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Divider />
        </Box>
        <Box sx={{ height: 350, width: "100%" }}>
          <>
            {" "}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Id</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statusdatum?.map((row, key) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{key + 1}</TableCell>
                      <TableCell align="left">{row.Status}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => deleteHandler(row._id)}
                          style={{
                            color: "#FF0033",
                            fontSize: 20,
                            margin: 2,
                            cursor: "pointer",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </Box>
      </>
    </div>
  );
}
