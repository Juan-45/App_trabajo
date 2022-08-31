import { Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
/*import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";*/
import MobileButton from "components/MobileButton";
import CustomMenu from "./mobileNavigation/CustomMenu";
import CustomMenuItem from "./mobileNavigation/CustomMenuItem";
import useMenu from "hooks/useMenu";
import useNavigation from "hooks/useNavigation";
//import useAccountSettings from "hooks/useAccountSettings";

const MobileNavigation = ({ navArguments, tooltipTitle }) => {
  const {
    setElementPosition,
    elementPosition,
    handleOpenMenu,
    handleCloseMenu,
  } = useMenu();

  /*const { logOffRequest, openSettingsHandler } = useAccountSettings({
    setElementPosition,
  });*/

  const { getOnClickHandler } = useNavigation({
    callback: () => setElementPosition(false),
  });

  /*const settingsArguments = [
    {
      isSetting: true,
      label: "Opciones",
      iconComponent: <Settings fontSize='small' />,
      onClick: openSettingsHandler,
    },
    {
      isSetting: true,
      label: "Cerrar cuenta",
      iconComponent: <Logout fontSize='small' />,
      onClick: logOffRequest,
    },
  ];*/

  return (
    <>
      <Tooltip title={tooltipTitle} placement='bottom-end'>
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
        {[...navArguments /*...settingsArguments*/].map((item) =>
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
