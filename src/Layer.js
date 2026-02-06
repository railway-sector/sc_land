const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer");

// const defaultPierAccessLabel = new LabelClass({
//   symbol: new LabelSymbol3D({
//     symbolLayers: [
//       new TextSymbol3DLayer({
//         material: {
//           color: valueLabelColor,
//         },
//         size: 15,
//         font: {
//           family: "Ubuntu Mono",
//           weight: "bold",
//         },
//       }),
//     ],
//     verticalOffset: {
//       screenLength: 80,
//       maxWorldLength: 500,
//       minWorldLength: 30,
//     },
//     callout: {
//       type: "line",
//       size: 0.5,
//       color: [0, 0, 0],
//       border: {
//         color: [255, 255, 255, 0.7],
//       },
//     },
//   }),
//   labelExpressionInfo: {
//     expression: "$feature.PierNumber",
//     //'DefaultValue($feature.GeoTechName, "no data")'
//     //"IIF($feature.Score >= 13, '', '')"
//     //value: "{Type}"
//   },
//   labelPlacement: "above-center",
//   // where: 'AccessDate IS NULL',
// });
export const pierAccessLayer = new FeatureLayer(
  {
    portalItem: {
      id: "e09b9af286204939a32df019403ef438",
      portal: {
        url: "https://gis.railway-sector.com/portal",
      },
    },
    layerId: 3,
    // labelingInfo: [defaultPierAccessLabel], // [pierAccessReadyDateLabel, pierAccessNotYetLabel, pierAccessDateMissingLabel], //[pierAccessDateMissingLabel, pierAccessReadyDateLabel, pierAccessNotYetLabel],
    title: "Pier Number", //'Pier with Access Date',
    minScale: 150000,
    maxScale: 0,
    popupEnabled: false,
    elevationInfo: {
      mode: "on-the-ground",
    },
  },
  //{ utcOffset: 300 },
);
