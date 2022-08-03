import MobileBarContainer from "./mobileNavMenu/MobileBarContainer";
import MobileNavigation from "./mobileNavMenu/MobileNavigation";
import React from "react";

const MobileNavMenu = ({ navArguments, tooltipTitle, setToken, token }) => (
  <MobileBarContainer>
    <MobileNavigation
      navArguments={navArguments}
      tooltipTitle={tooltipTitle}
      setToken={setToken}
      token={token}
    />
  </MobileBarContainer>
);

export default React.memo(MobileNavMenu);
