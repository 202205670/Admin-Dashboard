import { useMemo } from "react";

const useStatusCount = (driversData) => {
  const statusCount = useMemo(() => {
    const activeCount = driversData.filter(
      (driver) => driver.statusId === 1
    ).length;
    const inactiveCount = driversData.filter(
      (driver) => driver.statusId === 0
    ).length;
    return { activeCount: activeCount, inactiveCount: inactiveCount };
  }, [driversData]);

  return statusCount;
};
export default useStatusCount;
