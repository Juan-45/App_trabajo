import {
  Container,
  CustomButtonGroup,
  CustomButton,
} from "./navigationBar/CustomComponents";
import MobileNavMenu from "./navigationBar/MobileNavMenu";
import useNavigation from "hooks/useNavigation";

const NavigationBar = ({ navArguments }) => {
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
        tooltipTitle="Clickear para navegar"
      />
    </Container>
  );
};

export default NavigationBar;
