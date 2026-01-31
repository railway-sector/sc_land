import { useEffect, useRef, useState, use } from "react";
import { handedOverLotLayer, lotLayer } from "../layers";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import Query from "@arcgis/core/rest/support/Query";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import {
  generateLotData,
  generateLotNumber,
  thousands_separators,
  generateHandedOver,
  zoomToLayer,
  generateHandedOverArea,
  dateUpdate,
  polygonViewQueryFeatureHighlight,
} from "../Query";
import "../App.css";
import "@esri/calcite-components/dist/components/calcite-segmented-control";
import "@esri/calcite-components/dist/components/calcite-segmented-control-item";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import { CalciteLabel, CalciteCheckbox } from "@esri/calcite-components-react";
import {
  barangayField,
  chart_width,
  cutoff_days,
  lotPriorityField,
  lotStatusField,
  lotStatusQuery,
  municipalityField,
  primaryLabelColor,
  updatedDateCategoryNames,
  valueLabelColor,
} from "../uniqueValues";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import { MyContext } from "../contexts/MyContext";

// Dispose function
function maybeDisposeRoot(divId) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

///*** Others */
/// Draw chart
const LotChart = () => {
  const arcgisScene = document.querySelector("arcgis-scene");
  const { municipals, barangays } = use(MyContext);

  // 0. Updated date
  const [asOfDate, setAsOfDate] = useState(null);
  const [daysPass, setDaysPass] = useState(false);
  useEffect(() => {
    dateUpdate(updatedDateCategoryNames[0]).then((response) => {
      setAsOfDate(response[0][0]);
      setDaysPass(response[0][1] >= cutoff_days ? true : false);
    });
  }, []);

  // Add zoomToLayer in App component, not LotChart component
  useEffect(() => {
    if (municipals && !barangays) {
      lotLayer.definitionExpression = queryMunicipality;
    } else if (municipals && barangays) {
      lotLayer.definitionExpression = queryMunicipalBarangay;
    }
    zoomToLayer(lotLayer, arcgisScene);
  }, [municipals, barangays]);

  // 1. Land Acquisition
  const pieSeriesRef = useRef({});
  const legendRef = useRef({});
  const chartRef = useRef({});
  const [lotData, setLotData] = useState([
    {
      category: String,
      value: Number,
      sliceSettings: {
        fill: am5.color("#00c5ff"),
      },
    },
  ]);

  // Segmeneted control items for priority
  const priority_items = [
    "None",
    "Top Priority",
    "2nd Priority",
    "3rd Priority",
  ];
  const [prioritySelected, setPrioritySelected] = useState(priority_items[0]);

  const chartID = "pie-two";

  const [lotNumber, setLotNumber] = useState([]);
  const [handedOverNumber, setHandedOverNumber] = useState([]);
  const [handedOverArea, setHandedOverArea] = useState();

  // Handed Over View checkbox
  const [handedOverCheckBox, setHandedOverCheckBox] = useState(false);

  // Query
  const queryPriority = `${lotPriorityField} = '` + prioritySelected + "'";
  const queryMunicipality = `${municipalityField} = '` + municipals + "'";
  const queryPriorityMunicipality = queryPriority + " AND " + queryMunicipality;
  const queryBarangay = `${barangayField} = '` + barangays + "'";
  const queryMunicipalBarangay = queryMunicipality + " AND " + queryBarangay;
  const queryPriorityMunicipalBarangay =
    queryPriorityMunicipality + " AND " + queryBarangay;
  // const queryField = lotStatusField + ' IS NOT NULL';

  useEffect(() => {
    if (prioritySelected === "None") {
      if (!municipals) {
        lotLayer.definitionExpression = "1=1";
        handedOverLotLayer.definitionExpression = "1=1";
      } else if (municipals && !barangays) {
        lotLayer.definitionExpression = queryMunicipality;
        handedOverLotLayer.definitionExpression = queryMunicipality;
      } else if (municipals && barangays) {
        lotLayer.definitionExpression = queryMunicipalBarangay;
        handedOverLotLayer.definitionExpression = queryMunicipalBarangay;
      }
    } else if (prioritySelected !== "None") {
      if (!municipal) {
        lotLayer.definitionExpression = queryPriority;
        handedOverLotLayer.definitionExpression = queryPriority;
      } else if (municipal && !barangay) {
        lotLayer.definitionExpression = queryPriorityMunicipality;
        handedOverLotLayer.definitionExpression = queryPriorityMunicipality;
      } else if (municipal && barangay) {
        lotLayer.definitionExpression = queryPriorityMunicipalBarangay;
        handedOverLotLayer.definitionExpression =
          queryPriorityMunicipalBarangay;
      }
    }
    zoomToLayer(lotLayer, arcgisScene);
  }, [prioritySelected]);

  useEffect(() => {
    if (handedOverCheckBox === true) {
      handedOverLotLayer.visible = true;
    } else {
      handedOverLotLayer.visible = false;
    }
  }, [handedOverCheckBox]);

  useEffect(() => {
    generateLotData(prioritySelected, municipals, barangays).then((result) => {
      setLotData(result);
    });

    // Lot number
    generateLotNumber().then((response) => {
      setLotNumber(response);
    });

    generateHandedOver().then((response) => {
      setHandedOverNumber(response);
    });

    generateHandedOverArea(municipals, barangays).then((response) => {
      setHandedOverArea(response);
    });
  }, [prioritySelected, municipals, barangays]);

  // useLayoutEffect runs synchronously. If this is used with React.lazy,
  // Every time calcite action is fired, the chart is fired, too.
  // To avoid, use useEffect instead of useLayoutEffect

  // 1. Pie Chart for Land Acquisition
  useEffect(() => {
    // Dispose previously created root element

    maybeDisposeRoot(chartID);

    const root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );
    chartRef.current = chart;

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    const pieSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "category",
        valueField: "value",
        //legendLabelText: "[{fill}]{category}[/]",
        legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
        radius: am5.percent(45), // outer radius
        innerRadius: am5.percent(28),
        scale: 1.8,
      }),
    );
    pieSeriesRef.current = pieSeries;
    chart.series.push(pieSeries);

    // values inside a donut
    let inner_label = pieSeries.children.push(
      am5.Label.new(root, {
        text: "[#ffffff]{valueSum}[/]\n[fontSize: 0.6em; #d3d3d3; verticalAlign: super]PRIVATE LOTS[/]",
        fontSize: "1.2em",
        centerX: am5.percent(50),
        centerY: am5.percent(40),
        populateText: true,
        oversizedBehavior: "fit",
        textAlign: "center",
      }),
    );

    pieSeries.onPrivate("width", (width) => {
      inner_label.set("maxWidth", width * 0.7);
    });

    // Set slice opacity and stroke color
    pieSeries.slices.template.setAll({
      toggleKey: "none",
      fillOpacity: 0.9,
      stroke: am5.color("#ffffff"),
      strokeWidth: 0.5,
      strokeOpacity: 1,
      templateField: "sliceSettings",
      tooltipText: '{category}: {valuePercentTotal.formatNumber("#.")}%',
    });

    // Disabling labels and ticksll
    pieSeries.labels.template.set("visible", false);
    pieSeries.ticks.template.set("visible", false);

    // EventDispatcher is disposed at SpriteEventDispatcher...
    // It looks like this error results from clicking events
    pieSeries.slices.template.events.on("click", (ev) => {
      const selected = ev.target.dataItem?.dataContext;
      const categorySelected = selected.category;
      const find = lotStatusQuery.find(
        (emp) => emp.category === categorySelected,
      );
      const statusSelected = find?.value;
      const qExpression = `Municipality = '${municipals}' AND ${lotStatusField} = ${statusSelected}`;

      polygonViewQueryFeatureHighlight({
        polygonLayer: lotLayer,
        qExpression: qExpression,
        view: arcgisScene?.view,
      });
    });

    pieSeries.data.setAll(lotData);

    // Disabling labels and ticksll
    pieSeries.labels.template.setAll({
      // fill: am5.color('#ffffff'),
      // fontSize: '0.5rem',
      visible: false,
      scale: 0,
      // oversizedBehavior: 'wrap',
      // maxWidth: 65,
      // text: "{category}: [#C9CC3F; fontSize: 10px;]{valuePercentTotal.formatNumber('#.')}%[/]",
    });

    // pieSeries.labels.template.set('visible', true);
    pieSeries.ticks.template.setAll({
      // fillOpacity: 0.9,
      // stroke: am5.color('#ffffff'),
      // strokeWidth: 0.3,
      // strokeOpacity: 1,
      visible: false,
      scale: 0,
    });

    // Legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        // scale: 0.9,
      }),
    );
    legendRef.current = legend;
    legend.data.setAll(pieSeries.dataItems);

    // Change the size of legend markers
    legend.markers.template.setAll({
      width: 18,
      height: 18,
    });

    // Change the marker shape
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    // Responsive legend
    // https://www.amcharts.com/docs/v5/tutorials/pie-chart-with-a-legend-with-dynamically-sized-labels/
    // This aligns Legend to Left
    chart.onPrivate("width", function (width) {
      const boxWidth = 270; //props.style.width;
      const availableSpace = Math.max(
        width - chart.height() - boxWidth,
        boxWidth,
      );
      //const availableSpace = (boxWidth - valueLabelsWidth) * 0.7
      legend.labels.template.setAll({
        width: availableSpace,
        maxWidth: availableSpace,
      });
    });

    // To align legend items: valueLabels right, labels to left
    // 1. fix width of valueLabels
    // 2. dynamically change width of labels by screen size

    // Change legend labelling properties
    // To have responsive font size, do not set font size
    legend.labels.template.setAll({
      oversizedBehavior: "truncate",
      fill: am5.color("#ffffff"),
      //textDecoration: "underline"
      //width: am5.percent(200)
      //fontWeight: "300"
    });

    legend.valueLabels.template.setAll({
      textAlign: "right",
      //width: valueLabelsWidth,
      fill: am5.color("#ffffff"),
      //fontSize: LEGEND_FONT_SIZE,
    });

    legend.itemContainers.template.setAll({
      // set space between legend items
      paddingTop: 3,
      paddingBottom: 1,
    });

    pieSeries.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartID, lotData]);

  useEffect(() => {
    pieSeriesRef.current?.data.setAll(lotData);
    legendRef.current?.data.setAll(pieSeriesRef.current.dataItems);
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          marginLeft: "15px",
          marginRight: "25px",
          justifyContent: "space-between",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Land_logo.png"
          alt="Land Logo"
          height={"14%"}
          width={"14%"}
          style={{ paddingTop: "15px", paddingLeft: "15px" }}
        />
        <dl style={{ alignItems: "center", marginRight: "20px" }}>
          <dt style={{ color: primaryLabelColor, fontSize: "1.1rem" }}>
            TOTAL LOTS
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: "1.9rem",
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
            }}
          >
            {thousands_separators(lotNumber[0])}
          </dd>
        </dl>
      </div>

      <div
        style={{
          color: daysPass === true ? "red" : "gray",
          fontSize: "0.8rem",
          float: "right",
          marginRight: "5px",
        }}
      >
        {!asOfDate ? "" : "As of " + asOfDate}
      </div>

      {/* Lot Chart */}
      <div
        id={chartID}
        style={{
          width: chart_width,
          height: "60vh",
          backgroundColor: "rgb(0,0,0,0)",
          color: "white",
          marginTop: "6%",
          marginBottom: "7px",
        }}
      ></div>

      {/* Handed Over */}
      <div
        style={{
          display: "flex",
          marginLeft: "15px",
          marginRight: "15px",
          justifyContent: "space-between",
          // marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            height: "0",
            marginTop: "17px",
            marginRight: "-10px",
          }}
        >
          <CalciteCheckbox
            name="handover-checkbox"
            label="VIEW"
            scale="l"
            onCalciteCheckboxChange={(event) =>
              setHandedOverCheckBox(handedOverCheckBox === false ? true : false)
            }
          ></CalciteCheckbox>
        </div>
        <dl style={{ alignItems: "center" }}>
          <dt style={{ color: primaryLabelColor, fontSize: "1.0rem" }}>
            Total Handed-Over
          </dt>
          <dd
            style={{
              color: valueLabelColor,
              fontSize: "1.7rem",
              fontWeight: "bold",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
            }}
          >
            {handedOverNumber[0]}% ({thousands_separators(handedOverNumber[1])})
          </dd>
        </dl>
        <dl style={{ alignItems: "center" }}>
          <dt style={{ color: primaryLabelColor, fontSize: "1.0rem" }}>
            Handed-Over Area
          </dt>
          {/* #d3d3d3 */}
          <dd
            style={{
              color: valueLabelColor,
              fontSize: "1.7rem",
              fontFamily: "calibri",
              lineHeight: "1.2",
              margin: "auto",
              fontWeight: "bold",
            }}
          >
            {handedOverArea && thousands_separators(handedOverArea.toFixed(0))}
            <label style={{ fontWeight: "normal", fontSize: "1.3rem" }}>
              {" "}
              m
            </label>
            <label style={{ verticalAlign: "super", fontSize: "0.6rem" }}>
              2
            </label>
          </dd>
        </dl>
      </div>
    </>
  );
}; // End of lotChartgs

export default LotChart;
