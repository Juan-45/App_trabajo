import {
  Container,
  CustomButtonGroup,
  CustomButton,
  AccountSettingsWrapper,
  LoggedUser,
} from "./navigationBar/CustomComponents";
import MobileNavMenu from "./navigationBar/MobileNavMenu";
//import AccountSettings from "./navigationBar/AccountSettings";
import useNavigation from "hooks/useNavigation";

const NavigationBar = ({ navArguments, loggedUserName }) => {
  const { getOnClickHandler } = useNavigation();

  return (
    <Container>
      <CustomButtonGroup>
        {navArguments.map((item) => (
          <CustomButton
            name={item.name}
            key={item.name}
            onClick={getOnClickHandler(item.path)}
          >
            {item.label}
          </CustomButton>
        ))}
      </CustomButtonGroup>
      <MobileNavMenu
        navArguments={navArguments}
        tooltipTitle='Clickear para navegar'
      />
      <AccountSettingsWrapper>
        <LoggedUser>{loggedUserName}</LoggedUser>
        {/*<AccountSettings />*/}
      </AccountSettingsWrapper>
    </Container>
  );
};

export default NavigationBar;
