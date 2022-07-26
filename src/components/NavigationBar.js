import {
  Container,
  CustomButtonGroup,
  CustomButton,
  AccountSettingsWrapper,
  LoggedUser,
} from "./navigationBar/CustomComponents";
import MobileNavMenu from "./navigationBar/MobileNavMenu";
import useNavigation from "hooks/useNavigation";

const NavigationBar = ({ navArguments, loggedUserName, refresh }) => {
  const { getOnClickHandler } = useNavigation({ refresh });

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
      </AccountSettingsWrapper>
    </Container>
  );
};

export default NavigationBar;
