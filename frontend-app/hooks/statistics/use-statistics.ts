import { useContext } from "react";

import StatisticsContext, {
  StatisticsState,
} from "@/contexts/statistics-context";

const useStatistics = (): StatisticsState => {
  return useContext(StatisticsContext);
};

export default useStatistics;
