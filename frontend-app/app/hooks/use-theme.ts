import { useContext } from "react";

import ThemeContext, { ThemeState } from "../context/theme-context";

const useTheme = (): ThemeState => {
  return useContext(ThemeContext);
};

export default useTheme;
