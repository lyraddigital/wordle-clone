import { useContext } from "react";

import ThemeContext, { ThemeState } from "@/contexts/theme-context";

const useTheme = (): ThemeState => {
  return useContext(ThemeContext);
};

export default useTheme;
