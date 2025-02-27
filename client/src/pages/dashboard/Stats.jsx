import { useAppContext } from "@context/appContext";
import { useEffect } from "react";
import { Loading } from "@components/index";
import { ChartsContainer, StatsContainer } from "@components/index";
function Stats() {
  const { showStats, isLoading, monthlyApplications } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <StatsContainer />
       {monthlyApplications.length > 0 && <ChartsContainer />}
    </div>
  );
}

export default Stats;
