import React from "react";

const useMenu = () => {
  const [elementPosition, setElementPosition] = React.useState();
  const handleOpenMenu = React.useCallback(
    (e) => setElementPosition(e.currentTarget),
    []
  );
  const handleCloseMenu = React.useCallback(() => setElementPosition(null), []);

  return {
    setElementPosition,
    elementPosition,
    handleOpenMenu,
    handleCloseMenu,
  };
};

export default useMenu;
