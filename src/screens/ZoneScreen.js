import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Divider } from "../../node_modules/@material-ui/core/index";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles, Switch } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import { saveZone, updateZone, ZoneListDetails } from "../actions/ZoneAction";
import { useState } from "react";
import { useEffect } from "react";
import {
  ZONE_DELETE_RESET,
  ZONE_SAVE_RESET,
  ZONE_UPDATE_RESET,
} from "../constants/ZoneConstants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const useStyles = makeStyles({
  switch: {
    "& .Mui-checked": {
      color: "#00CC00",
      // transform: "translateX(25px) !important",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#00CC00 !important",
    },
  },
});
export default function ZoneScreen() {
  const params = useParams();
  const EditId = params.id;
  console.log("EditId", EditId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ZoneSave = useSelector((state) => state.ZoneSave);
  const { success: zonesavee } = ZoneSave;
  const ZoneList = useSelector((state) => state.ZoneList);
  const { zonedatum } = ZoneList;
  console.log("zonedatum", zonedatum);
  console.log("zonesavee", zonesavee);
  const [Checked, setChecked] = useState(true);

  const zoneData = zonedatum?.find((x) => x._id === EditId);
  console.log("zoneData", zoneData);
  const [EditChecked, setEditChecked] = useState(zoneData?.checked);
  const [EditZoneName, setEditZoneName] = useState(zoneData?.zoneName);
  const switchHandler = (event) => {
    if (Checked === true) {
      setChecked(event.target.checked);
    } else {
      setChecked(event.target.checked);
    }
  };
  console.log("Checked", Checked);

  const ZoneDelete = useSelector((state) => state.ZoneDelete);
  const { success: successDelete } = ZoneDelete;
  const ZoneUpdate = useSelector((state) => state.ZoneUpdate);
  const { success: zoneedit } = ZoneUpdate;

  useEffect(() => {
    dispatch(ZoneListDetails());
    if (zonesavee) {
      dispatch({ type: ZONE_SAVE_RESET });
    }
    if (successDelete) {
      dispatch({ type: ZONE_DELETE_RESET });
    }
    if (zoneedit) {
      dispatch({ type: ZONE_UPDATE_RESET });
    }
  }, [zonesavee, successDelete, zoneedit]);
  const SaveZoneDetails = (e) => {
    console.log("e", e);
    dispatch(
      saveZone({
        zoneName: e.zonename,
        checked: Checked,
      })
    );
    window.alert("Details saved Successfully");
    navigate("/locatgrid");
  };

  const UpdateZoneDetails = (e) => {
    console.log("e", e);
    dispatch(
      updateZone({
        id: EditId,
        zoneName: EditZoneName,
        checked: EditChecked,
      })
    );
    window.alert("Details Updated Successfully");
    navigate("/locatgrid");
  };

  const classes = useStyles();
  const theme = createTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      {" "}
      {EditId ? (
        <>
          {" "}
          <div>
            <Typography variant="h6" sx={{ mt: -1, mb: 1 }}>
              Update Zone
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ display: "flex", flexDerection: "row", mt: 1, mb: 1 }}
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
              <Link
                to="/locatgrid"
                style={{
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: "12px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}> Zone</Typography>
              </Link>
              <Typography sx={{ fontSize: "14px" }}> Update Zone</Typography>
            </Breadcrumbs>
            <Divider sx={{ mt: 1 }} />
            <Box sx={{ mt: 0, mb: 1 }}>
              <Box>
                {" "}
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
                      component="form"
                      onSubmit={handleSubmit(UpdateZoneDetails)}
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: "0px",
                        p: 5,
                        border: "1px solid #888888",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ mt: -3, alignItems: "center" }}
                        >
                          Update Zone
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontSize: 13, mt: 0, ml: -2, pr: 1 }}>
                          <span style={{ color: "red" }}>*</span>Zone name:
                        </Typography>
                        <Box sx={{ ml: 0, width: "70%" }}>
                          <TextField
                            size="small"
                            margin="normal"
                            id="zonename"
                            name="zonename"
                            autoComplete="off"
                            onChange={(e) => setEditZoneName(e.target.value)}
                            value={EditZoneName}
                            inputProps={{ style: { fontSize: 13 } }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontSize: 13, ml: -14 }}>
                          <span style={{ color: "red" }}>*</span>Active:
                        </Typography>
                        <Box sx={{ ml: 0 }}>
                          <Switch
                            className={classes.switch}
                            onChange={(e) => setEditChecked(e.target.checked)}
                            checked={EditChecked}
                            // size="small"
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Button
                          // fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2, alignItems: "center" }}
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
          </div>
        </>
      ) : (
        <>
          <div>
            <Typography variant="h6" sx={{ mt: -1, mb: 1 }}>
              Add Zone
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ display: "flex", flexDerection: "row", mt: 1, mb: 1 }}
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
              <Link
                to="/locatgrid"
                style={{
                  color: "rgba(0, 0, 0, 0.6)",
                  fontSize: "12px",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}> Zone</Typography>
              </Link>
              <Typography sx={{ fontSize: "14px" }}> Add Zone</Typography>
            </Breadcrumbs>
            <Divider sx={{ mt: 1 }} />
            <Box>
              <Box sx={{ mt: 0, mb: 1 }}>
                <Box>
                  {" "}
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
                        component="form"
                        onSubmit={handleSubmit(SaveZoneDetails)}
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                          alignItems: "center",
                          borderRadius: "0px",
                          p: 5,
                          border: "1px solid #888888",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ mt: -3, alignItems: "center" }}
                          >
                            Add Zone
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            sx={{ fontSize: 13, mt: 0, ml: -2, pr: 1 }}
                          >
                            <span style={{ color: "red" }}>*</span>Zone name:
                          </Typography>
                          <Box sx={{ ml: 0, width: "70%" }}>
                            <TextField
                              size="small"
                              margin="normal"
                              id="zonename"
                              name="zonename"
                              autoComplete="off"
                              {...register("zonename", { required: true })}
                              error={errors.zonename}
                              inputProps={{ style: { fontSize: 13 } }}
                            />
                            {errors.zonename && (
                              <span className="formError">
                                Zone Name is required
                              </span>
                            )}
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography sx={{ fontSize: 13, ml: -14 }}>
                            <span style={{ color: "red" }}>*</span>Active:
                          </Typography>
                          <Box sx={{ ml: 0 }}>
                            <Switch
                              className={classes.switch}
                              checked={Checked}
                              // color="success"
                              onChange={switchHandler}
                              // size="small"
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Button
                            // fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, alignItems: "center" }}
                            type="submit"
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </Box>
              </Box>
            </Box>
          </div>
        </>
      )}
    </>
  );
}
