import { Box } from "@mui/material/";

const MobileBarContainer = ({ children }) => (
  <Box
    sx={{
            display: { xs: "flex", md: "none" },
    }}
  >
    {children}
  </Box>
);

export default MobileBarContainer;
