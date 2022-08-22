import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
    AccountIconButton,
    AccountMenu,
    AccountMenuItem,
    AccountWrapper,
} from "./accountSettings/CustomComponents";
import useMenu from "hooks/useMenu";
import useAccountSettings from "hooks/useAccountSettings";

const AccountSettings = () => {
    const {
        setElementPosition,
        elementPosition,
        handleOpenMenu,
        handleCloseMenu,
    } = useMenu();

    const { logOffRequest, openSettingsHandler } = useAccountSettings({
        setElementPosition,
    });

    return (
        <AccountWrapper>
            <AccountIconButton
                tooltipText='Clickear para ver opciones de cuenta'
                onClick={handleOpenMenu}
            />
            <AccountMenu elementPosition={elementPosition} onClose={handleCloseMenu}>
                <AccountMenuItem text='Opciones' onClick={openSettingsHandler}>
                    <Settings fontSize='small' />
                </AccountMenuItem>
                <AccountMenuItem text='Cerrar cuenta' onClick={logOffRequest}>
                    <Logout fontSize='small' />
                </AccountMenuItem>
            </AccountMenu>
        </AccountWrapper>
    );
};

export default AccountSettings;
