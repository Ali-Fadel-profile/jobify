import { useState } from "react";
import { BarChartComponent, AreaChartComponent } from "@components/index";
import Wrapper from "@assets/wrappers/ChartsContainer";
import { useAppContext } from "@context/appContext";
function ChartsContainer() {
  const [showBar, setShowBar] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setShowBar(!showBar)}>
        {showBar ? "Area Chart" : "Bar Chart"}
      </button>
      <div>
        {" "}
        {showBar ? (
          <BarChartComponent data={data} />
        ) : (
          <AreaChartComponent data={data} />
        )}
      </div>
    </Wrapper>
  );
}

export default ChartsContainer;
