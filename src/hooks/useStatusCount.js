import { useMemo } from "react";

const useStatusCount = (driversData) => {
  const statusCount = useMemo(() => {
    // const activeCount = driversData.filter((driver) => driver.status === "Active").length;
    return { activeCount:driversData.length, inactiveCount:driversData.length };
  }, [driversData]);

  return statusCount;
};

export default useStatusCount;
