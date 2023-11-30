import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// import ModalImage from "react-modal-image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import Reviews from "@mui/material/Reviews";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ReactImageMagnify from "@vorld/react-image-magnify";
import Axios from "axios";

// import { CenterFocusStrong } from "../../node_modules/@mui/icons-material/index";
import { catProdIndividualId } from "../actions/catProductAction";
import { CategoryMasterallLists } from "../actions/categoryMasterAction";
import { FeaturesMasterListDetails } from "../actions/AttributeActions";
import { brandList } from "../actions/brandAction";

function ProductViewScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id: productId } = params;

  const catalogProd = useSelector((state) => state.catalogProd);
  const { catProducts } = catalogProd;

  console.log("catProducts", catProducts);

  const catProdDetail = useSelector((state) => state.catProdDetail);
  const { loading, error, catalogIndProd } = catProdDetail;

  const CategoryMasterallList = useSelector(
    (state) => state.CategoryMasterallList
  );
  const { categorymasterallList } = CategoryMasterallList;

  const FeaturesList = useSelector((state) => state.FeaturesList);
  const { Featuresdetails } = FeaturesList;
  const brandReduce = useSelector((state) => state.brandReduce);
  const { brandLists } = brandReduce;

  //   const FeaturesValueList = useSelector((state) => state.FeaturesValueList);
  //   const { Featuresvaluedetails } = FeaturesValueList;

  //     const categoryChilNew = useSelector((state) => state.categoryChilNew);
  //   const { categoryChildList } = categoryChilNew;

  //   const categorygrandChild = useSelector((state) => state.cate

  const [images, setImage] = useState();
  const [subimg, setSubImage] = useState();

  const [categoryName, setCategoryName] = useState();

  const handleChangeimage = (e) => {
    setImage(e.target.src);
  };

  useEffect(() => {
    dispatch(catProdIndividualId(productId));
    const fetchBusinesses = async () => {
      const img = await Axios.get(`/api/uploads/show/${productId}`, {
        responseType: "blob",
      });
      setImage(URL.createObjectURL(img.data));
    };

    const fetchBusines = async () => {
      const subimg = await Axios.get(`/api/uploads/showsub/${productId}`, {});
      setSubImage(subimg.data);
    };

    fetchBusines();
    fetchBusinesses();
    const fetchCategory = async () => {
      const categoryName = await Axios.get(
        `/api/categoryMain/categoryName/${productId}`
      );
      setCategoryName(categoryName.data);
    };
    const fetchCategoryGroup = async () => {
      //   const categorygroup = await Axios.get(
      //     `/api/subCategory/categorygroup/${productId}`
      //   );
    };
    fetchCategory();
    fetchCategoryGroup();

    dispatch(listProducts({}));
    dispatch(CategoryMasterallLists());
    dispatch(FeaturesMasterListDetails());
    dispatch(brandList());
  }, [dispatch, productId]);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Grid container spacing={3}>
          {/* four imgae except moblie  */}
          <Grid item lg={2}>
            <Grid
              sx={{
                zIndex: 1,
                display: {
                  xs: "none",
                  md: "block",
                  sm: "block",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              <Box
                sx={{
                  padding: 0,
                  margin: 0,
                  mt: 10,
                  listStyle: "none",
                  display: "inline",
                  flexFlow: "wrap column",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                <CardMedia
                  sx={{
                    border: "2px solid gray",
                    cursor: "pointer",
                    transition: "transform .5s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    margin: 1,
                    width: { xs: 60, sm: 50 },
                    height: { xs: 90, sm: 50 },
                    justifycontent: "space-between",
                  }}
                  component="img"
                  // height="200"
                  image={`/api/uploads/show/${productId}`}
                  alt={"subimgnew.filename"}
                  onMouseOver={handleChangeimage}
                />
                {subimg?.map((subimgnew, index) => (
                  <Box key={index}>
                    <CardMedia
                      sx={{
                        border: "2px solid gray",
                        cursor: "pointer",
                        transition: "transform .5s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                        margin: 1,

                        width: { xs: 60, sm: 50 },
                        height: { xs: 90, sm: 50 },
                        justifycontent: "space-between",
                      }}
                      component="img"
                      image={`/api/uploads/showsubimgnew/${subimgnew.filename}`}
                      alt={"subimgnew.filename"}
                      onMouseOver={handleChangeimage}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          {/* single big image */}
          <Grid item lg={6}>
            {" "}
            <Box
              sx={{
                borderRadius: 0,
                width: "auto",
                mt: -4,
                mb: 3,
                mr: 10,
                ml: -10,
              }}
            >
              <ReactImageMagnify
                {...{
                  smallImage: {
                    className: "large",
                    src: `${images}`,
                    width: 380,
                    height: 430,
                  },
                  largeImage: {
                    className: "small",
                    src: `${images}`,
                    width: 600,
                    height: 600,
                  },
                }}
              />
              {/* <Box >
                <CardMedia
                  sx={{
                    transition: "transform .5s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    width: 120,
                    height: 150,
                    justifycontent:'space-between'
                  }}
                  component="img"
                  // height="200"
                  image={images}
                 
                />
               
              </Box> */}
            </Box>
          </Grid>
          {/*  four image only for mobile view */}
          <Grid
            sx={{ mt: 4, display: { xs: "block", sm: "none", md: "none" } }}
          >
            <Box
              sx={{
                padding: 0,
                margin: 0,
                width: "auto",
                listStyle: "none",
                display: "flex",
                flexFlow: "wrap row",
                flexDirection: "row",
                alignItems: "right",
              }}
            >
              <CardMedia
                sx={{
                  border: "2px solid gray",
                  cursor: "pointer",
                  transition: "transform .5s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  margin: 1,
                  width: { xs: 60, sm: 120 },
                  height: { xs: 90, sm: 150 },
                  justifycontent: "space-between",
                }}
                component="img"
                // height="200"
                image={`/api/uploads/show/${productId}`}
                alt={"subimgnew.filename"}
                onMouseOver={handleChangeimage}
              />
              {subimg?.map((subimgnew, index) => (
                <Box key={index}>
                  <CardMedia
                    sx={{
                      border: "2px solid gray",
                      cursor: "pointer",
                      transition: "transform .5s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                      margin: 1,

                      width: { xs: 60, sm: 120 },
                      height: { xs: 90, sm: 150 },
                      justifycontent: "space-between",
                    }}
                    component="img"
                    // height="200"
                    image={`/api/uploads/showsubimgnew/${subimgnew.filename}`}
                    alt={"subimgnew.filename"}
                    onMouseOver={handleChangeimage}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          {/* product details */}
          <Grid item lg={4}>
            <Box
              sx={{
                borderRadius: 0,
                width: "auto",
                mt: -3,
                mb: 3,
                mr: 10,
                ml: -10,
              }}
            >
              <Card
                style={{
                  padding: 30,
                  border: 0,
                  borderRadius: 0,
                  margin: 20,
                  width: "365px",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{
                      color: "#000",
                      fontWeight: 800,
                      textTransform: "capitalize",
                      fontFamily: "Raleway",
                    }}
                  >
                    {catalogIndProd.prodname}
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      mt: 5,
                    }}
                    gutterBottom
                  >
                    {brandLists
                      ?.filter((brand) => {
                        return brand._id === catalogIndProd.brand;
                      })
                      .map((brand) => (
                        <>
                          <strong>Brand Name: </strong> {brand.name}
                        </>
                      ))}
                  </Typography>
                  {categoryName?.map((categoryname) => (
                    <>
                      <Typography
                        variant="h6"
                        style={{
                          color: "#000",
                          textTransform: "capitalize",
                          fontFamily: "Raleway",
                          mt: 5,
                        }}
                        gutterBottom
                      >
                        <strong>Category :</strong> {categoryname.categoryname}
                      </Typography>
                    </>
                  ))}

                  {/* <Typography
                    variant="body1"
                    style={{ color: "#A02020", textTransform: "capitalize" }}
                    gutterBottom
                  >
                    <strong>Description :</strong> {catalogIndProd.description}
                  </Typography> */}

                  <Typography
                    variant="h6"
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontFamily: "Raleway",
                    }}
                    gutterBottom
                  >
                    {categorymasterallList
                      ?.filter((cat) => {
                        return cat._id === catalogIndProd.catId;
                      })
                      ?.map((cat) => (
                        <>
                          <strong>Category : </strong>
                          <span style={{ fontSize: "18px" }}> {cat.name}</span>
                        </>
                      ))}
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontFamily: "Raleway",
                      mt: 5,
                    }}
                    gutterBottom
                  >
                    {Featuresdetails?.filter((feature) => {
                      return feature._id === catalogIndProd.featureId[0];
                    }).map((feature) => (
                      <>
                        <strong>Feature Name : </strong>{" "}
                        <span style={{ fontSize: "20px" }}>
                          {feature.featurename}{" "}
                        </span>
                      </>
                    ))}
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontFamily: "'Times New Roman', Times, serif",
                      mt: 5,
                    }}
                    gutterBottom
                  >
                    <strong>Reference No: </strong>
                    <span style={{ fontSize: "20px" }}>
                      {catalogIndProd.reference}
                    </span>
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontFamily: "'Times New Roman', Times, serif",
                      mt: 5,
                    }}
                    gutterBottom
                  >
                    <strong>Tax Inclued : </strong>{" "}
                    <span style={{ fontSize: "20px" }}>
                      {catalogIndProd.taxincluded}
                    </span>
                  </Typography>

                  <Typography
                    variant="h6"
                    style={{
                      color: "#000",
                      textTransform: "capitalize",
                      fontFamily: "'Times New Roman', Times, serif",
                      mt: 5,
                    }}
                    gutterBottom
                  >
                    <strong>Tax Exclued : </strong>
                    <span style={{ fontSize: "20px" }}>
                      {" "}
                      {catalogIndProd.taxexcluded}
                    </span>
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ProductViewScreen;
