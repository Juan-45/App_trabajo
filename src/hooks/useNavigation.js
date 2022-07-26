import { useNavigate, useLocation } from "react-router-dom";

const useNavigation = ({ refresh }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getOnClickHandler =
    (currentPath, callback = () => {}) =>
    () => {
      if (location.pathname !== currentPath) {
        navigate(currentPath);
      } else if (refresh) {
        navigate(0);
      }
      callback();
    };

  return {
    getOnClickHandler,
  };
};

export default useNavigation;
