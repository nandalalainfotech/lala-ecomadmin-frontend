import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FeaturesCategory,
  FeaturesMasterListDetails,
  updatefeature,
} from "../actions/AttributeActions";

function FuatureFormScreen() {
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const customindId = params.id;

  const FeaturesList = useSelector((state) => state.FeaturesList);
  const { Featuresdetails } = FeaturesList;

  const FuterueId = Featuresdetails?.find((x) => x?._id === customindId);

  const [BtnFeature, setBtnFeature] = useState(0);
  const [, setBtnFeatureAnother] = useState(0);
  const [FeatureeditName, setFeatureNameEdit] = useState(
    FuterueId?.featurename
  );

  const createFeature = (e) => {
    if (BtnFeature === 1) {
      dispatch(
        FeaturesCategory({
          Featurename: e.fname,
        })
      );
      window.confirm("Features Saved Successfully!!");
      navigate("/attributes");
      event.target.reset();
      setBtnFeature(0);
      setBtnFeatureAnother(0);
    } else {
      dispatch(
        FeaturesCategory({
          Featurename: e.fname,
        })
      );
      window.confirm("Features Saved Successfully!!");

      event.target.reset();
      setBtnFeature(0);
      setBtnFeatureAnother(0);
    }
  };

  const updateFeature = () => {
    dispatch(
      updatefeature({
        _id: FuterueId?._id,
        featurename: FeatureeditName,
      })
    );
    window.confirm("Feature Update Successfully!!");
    navigate("/attributes");
  };

  useEffect(() => {
    // dispatch(FeaturesValueListDetails());
    dispatch(FeaturesMasterListDetails());
  }, [dispatch]);
  return (
    <>
      {FuterueId?._id ? (
        <>
          <Typography variant="h6" sx={{ mt: -1, mb: 1 }}>
            Update Feature
          </Typography>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ display: "flex", flexDerection: "row", mt: 1 }}
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
              to="/attributes"
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>Feature</Typography>
            </Link>
            <Typography sx={{ fontSize: "14px" }}>Update Feature</Typography>
          </Breadcrumbs>
          <Divider />
          <Box>
            <ThemeProvider theme={theme}>
              <Container
                component="main"
                maxWidth="sm"
                sx={{ my: { xs: 3, md: 6, lg: 10 }, p: { xs: 2, md: 1 } }}
              >
                <CssBaseline />

                <Box
                  onSubmit={handleSubmit2(updateFeature)}
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
                    Update Features
                  </Typography>
                  <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="fname"
                    label="Name"
                    name="fname"
                    autoComplete="off"
                    value={FeatureeditName}
                    onChange={(e) => setFeatureNameEdit(e.target.value)}
                  />
                  <Box sx={{ mb: -2 }}>
                    <Button
                      // fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        borderRadius: "20px",
                        backgroundColor: "#0099CC",
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
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mt: -1, mb: 1 }}>
            Add Feature
          </Typography>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ display: "flex", flexDerection: "row", mt: 1 }}
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
              to="/attributes"
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "12px",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>Feature</Typography>
            </Link>
            <Typography sx={{ fontSize: "14px" }}>Add Feature</Typography>
          </Breadcrumbs>
          <Divider />
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
                  onSubmit={handleSubmit2(createFeature)}
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
                    Create Features
                  </Typography>
                  <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    id="fname"
                    label="Name"
                    name="fname"
                    autoComplete="off"
                    {...register2("fname", { required: true })}
                    error={errors2.fname}
                  />
                  {errors2.name && (
                    <span className="formError">Name is required</span>
                  )}
                  <Box sx={{ display: "flex", mb: -2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        borderRadius: "20px",
                        backgroundColor: "#0099CC",
                      }}
                      type="submit"
                      onClick={() => setBtnFeatureAnother(2)}
                    >
                      Save and Add
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        ml: 5,
                        borderRadius: "20px",
                        backgroundColor: "#0099CC",
                      }}
                      type="Click"
                      onClick={() => setBtnFeature(1)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </>
      )}
    </>
  );
}

export default FuatureFormScreen;
