import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const CustomBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",

  marginRight: "auto",
  marginLeft: "auto",
  marginTop: "50px",
  marginBottom: "300px",
  minWidth: "400px",
  padding: "0px 25px",
  boxSizing: "border-box",
});

const PageWrapper = ({ children }) => (
  <CustomBox
    sx={{
      width: { xs: "100%", lg: "1366px" },
      justifyContent: "center",
    }}
  >
    {children}
  </CustomBox>
);

export default PageWrapper;
