import { useNavigate, useLocation } from "react-router-dom";

const useNavigation = (callback = () => {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getOnClickHandler = (currentPath) => () => {
    if (location.pathname !== currentPath) {
      navigate(currentPath);
    } else navigate(0);
    callback();
  };

  return {
    getOnClickHandler,
  };
};

export default useNavigation;
