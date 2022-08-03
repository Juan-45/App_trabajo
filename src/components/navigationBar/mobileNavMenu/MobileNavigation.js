import { Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MobileButton from "components/MobileButton";
import CustomMenu from "./mobileNavigation/CustomMenu";
import CustomMenuItem from "./mobileNavigation/CustomMenuItem";
import useMenu from "hooks/useMenu";
import useNavigation from "hooks/useNavigation";

const MobileNavigation = ({ navArguments, tooltipTitle }) => {
  const {
    setElementPosition,
    elementPosition,
    handleOpenMenu,
    handleCloseMenu,
  } = useMenu();

  const { getOnClickHandler } = useNavigation({
    callback: () => setElementPosition(false),
  });

  return (
    <>
      <Tooltip title={tooltipTitle} placement="bottom-end">
        <MobileButton onClick={handleOpenMenu}>
          <MenuIcon />
        </MobileButton>
      </Tooltip>
      <CustomMenu
        anchorEl={elementPosition}
        keepMounted
        open={Boolean(elementPosition)}
        onClose={handleCloseMenu}
      >
        {[...navArguments].map((item) =>
          item.isSetting ? (
            <CustomMenuItem
              onClick={item.onClick}
              label={item.label}
              key={item.label}
              iconComponent={item.iconComponent}
            />
          ) : (
            <CustomMenuItem
              onClick={getOnClickHandler(item.path)}
              label={item.label}
              key={item.label}
            />
          )
        )}
      </CustomMenu>
    </>
  );
};

export default MobileNavigation;
