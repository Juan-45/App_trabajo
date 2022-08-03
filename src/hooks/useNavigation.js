import { useNavigate } from "react-router-dom";

const useNavigation = (callback = () => {}) => {
  const navigate = useNavigate();

  const getOnClickHandler = (currentPath) => () => {
    navigate(currentPath);
    callback();
  };

  return {
    getOnClickHandler,
  };
};

export default useNavigation;
