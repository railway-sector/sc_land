import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteTab,
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
} from "@esri/calcite-components-react";
import LotChart from "./LotChart";
import "../index.css";
import "../App.css";
import StructureChart from "./StructureChart";
import NloChart from "./NloChart";
import ExpropriationList from "./ExpropriationList";

function MainChart() {
  return (
    <>
      <CalciteTabs
        // style={{ width: "37%" }}
        slot="panel-end"
        layout="center"
        scale="m"
        style={{
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          // borderTopWidth: 5,
          borderColor: "#555555",
        }}
      >
        <CalciteTabNav slot="title-group" id="thetabs">
          <CalciteTabTitle class="Land">Land</CalciteTabTitle>
          <CalciteTabTitle class="Structure">Structure</CalciteTabTitle>
          <CalciteTabTitle class="Households">Households</CalciteTabTitle>
          <CalciteTabTitle class="ExproList">ExproList</CalciteTabTitle>
        </CalciteTabNav>

        {/* CalciteTab: Lot */}
        <CalciteTab>
          <LotChart />
        </CalciteTab>

        {/* CalciteTab: Structure */}
        <CalciteTab>
          <StructureChart />
        </CalciteTab>

        {/* CalciteTab: Non-Land Owner */}
        <CalciteTab>
          <NloChart />
        </CalciteTab>

        {/* CalciteTab: List of Lots under Expropriation */}
        <CalciteTab>
          <ExpropriationList />
        </CalciteTab>
      </CalciteTabs>
    </>
  );
}

export default MainChart;
