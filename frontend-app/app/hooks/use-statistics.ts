import { useContext } from "react";

import StatisticsContext, {
  StatisticsState,
} from "../context/statistics-context";

const useStatistics = (): StatisticsState => {
  return useContext(StatisticsContext);
};

export default useStatistics;
