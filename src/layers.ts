import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  TextSymbol3DLayer,
  LabelSymbol3D,
  SimpleLineSymbol,
  PolygonSymbol3D,
  ExtrudeSymbol3DLayer,
  PointSymbol3D,
  IconSymbol3DLayer,
  SimpleMarkerSymbol,
  LineSymbol3D,
  PathSymbol3DLayer,
} from "@arcgis/core/symbols";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import {
  barangayField,
  cpField,
  endorsedField,
  endorsedStatus,
  landOwnerField,
  landUseField,
  lotHandedOverDateField,
  lotHandedOverField,
  lotStatusColor,
  lotStatusField,
  lotStatusLabel,
  lotUseArray,
  municipalityField,
  nloStatusField,
  nloStatusLabel,
  nloStatusSymbolRef,
  percentHandedOverField,
  structureOccupancyRef,
  structureOccupancyStatusField,
  structureOccupancyStatusLabel,
  structureOwnershipColor,
  structureOwnershipStatusField,
  structureOwnershipStatusLabel,
  structureStatusColorRgb,
  structureStatusField,
  structureStatusLabel,
  tunnelAffectLotField,
  valueLabelColor,
} from "./uniqueValues";

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

//* SOMCO Fence */
// const line_3d = new LineSymbol3D({
//   symbolLayers: [
//     new LineSymbol3DLayer({
//       size: 5,
//       material: { color: 'yellow' },
//       cap: 'round',
//       join: 'round',
//       pattern: new LineStylePattern3D({
//         style: 'solid',
//       }),
//     }),
//   ],
// });

const line_3d = new LineSymbol3D({
  symbolLayers: [
    new PathSymbol3DLayer({
      profile: "quad",
      width: 0.5,
      height: 5,
      material: { color: "#ffff00" },
    }),
  ],
});
// const somco_renderer = new SimpleRenderer({
//   symbol: new SimpleLineSymbol({
//     color: '#ffff00',
//     width: '2px',
//   }),
// });

const somco_renderer = new SimpleRenderer({
  symbol: line_3d,
});

export const somco_fense_layer = new FeatureLayer({
  portalItem: {
    id: "5c14f6e9e59b40ef87bb4da0f611e5e5",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "SOMCO Fence",
  elevationInfo: {
    mode: "on-the-ground",
  },
  // labelingInfo: [labelChainage],
  // minScale: 150000,
  // maxScale: 0,
  renderer: somco_renderer,
  popupEnabled: false,
});

/* Chainage Layer  */
const labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

const chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,

  popupEnabled: false,
});

/* Station Box */
const stationBoxRenderer = new UniqueValueRenderer({
  field: "Layer",
  uniqueValueInfos: [
    {
      value: "00_Platform",
      label: "Platform",
      symbol: new SimpleFillSymbol({
        color: [160, 160, 160],
        style: "backward-diagonal",
        outline: {
          width: 1,
          color: "black",
        },
      }),
    },
    {
      value: "00_Platform 10car",
      label: "Platform 10car",
      symbol: new SimpleFillSymbol({
        color: [104, 104, 104],
        style: "cross",
        outline: {
          width: 1,
          color: "black",
          style: "short-dash",
        },
      }),
    },
    {
      value: "00_Station",
      label: "Station Box",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2,
          color: [115, 0, 0],
        },
      }),
    },
  ],
});

export const stationBoxLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 7,
  renderer: stationBoxRenderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",

  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* ROW Layer */
const prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  layerId: 5,
  title: "PROW",
  popupEnabled: false,
  renderer: prowRenderer,
});
// prowLayer.listMode = "hide";

/* ROW Layer version 7.1.6 */
const prowoldRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#DF00FF",
    width: "2px",
    // style: "long-dash-dot",
  }),
});

export const prowLayerold = new FeatureLayer({
  portalItem: {
    id: "84ba987eed264fe9b18938000ddf702d",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "SC Alignment 7.1.6",
  popupEnabled: false,
  renderer: prowoldRenderer,
});

/* Meralco site 1 additioinal PROW Layer */

export const meralco_site1_prowLayer = new FeatureLayer({
  portalItem: {
    id: "87ec32eacf194b91b040ca052574234b",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "Meralco Site 1 Additional PROW",
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: prowRenderer,
});

/*------- NGCP Layers ---------- */
/* NGCP Working Area */
const ngcpPoleWARenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [197, 0, 255],
    style: "backward-diagonal",
    outline: {
      color: "#C500FF",
      width: 0.7,
    },
  }),
});

// export const ngcp_working_area7 = new FeatureLayer({
//   portalItem: {
//     id: "b7d01020d54c4015ba0ba9454475d1dc",
//     portal: {
//       url: "https://gis.railway-sector.com/portal",
//     },
//   },
//   renderer: ngcpPoleWARenderer,
//   elevationInfo: {
//     mode: "on-the-ground",
//   },
//   definitionExpression: "SiteNo = '7'",
//   layerId: 7,
//   title: "Proposed Pole Working Areas",
// });

export const ngcp_working_area6 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  renderer: ngcpPoleWARenderer,
  elevationInfo: {
    mode: "on-the-ground",
  },
  definitionExpression: "SiteNo = '6'",
  layerId: 7,
  title: "Proposed Pole Working Areas",
});

/* NGCP Line  */
const bufferColor = ["#55FF00", "#FFFF00", "#E1E1E1"];
const ngcpLineRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: bufferColor[0],
    width: "3px",
    style: "dash",
  }),
});

export const ngcp_line7 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: ngcpLineRenderer,
  definitionExpression: "SiteNo = '7' AND LAYER = 2", // 2 is 'Relocation'
  layerId: 2,
  title: "Proposed/Recorded NGCP Lines",
});

export const ngcp_line6 = new FeatureLayer({
  portalItem: {
    id: "b7d01020d54c4015ba0ba9454475d1dc",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: ngcpLineRenderer,
  definitionExpression: "SiteNo = '6' AND LAYER = 2",
  layerId: 2,
  title: "Proposed/Recorded NGCP Lines",
});

/* NGCP Pole site */
const label_ngcp_pole = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: [255, 255, 0],
        },
        size: 15,
        halo: {
          color: "black",
          size: 0.5,
        },
        // font: {
        //   family: 'Ubuntu Mono',
        //   //weight: "bold"
        // },
      }),
    ],
    verticalOffset: {
      screenLength: 30,
      maxWorldLength: 20,
      minWorldLength: 10,
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.POLE_ID",
    //value: "{TEXTSTRING}"
  },
});

const ngcpDpwhRoadRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [255, 255, 0],
    style: "backward-diagonal",
    outline: {
      color: "#FFFF00",
      width: 0.7,
    },
  }),
});

export const ngcp_pole7 = new FeatureLayer({
  portalItem: {
    id: "d5b30a79bdae40c492771ec1e46ab0e9",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  definitionExpression: "SiteNo = '7'",
  layerId: 3,
  renderer: ngcpDpwhRoadRenderer,
  labelingInfo: [label_ngcp_pole],
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: true,
  title: "Proposed Pole Relocation",
});

export const ngcp_pole6 = new FeatureLayer({
  portalItem: {
    id: "d5b30a79bdae40c492771ec1e46ab0e9",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  definitionExpression: "SiteNo = '6'",
  layerId: 3,
  renderer: ngcpDpwhRoadRenderer,
  labelingInfo: [label_ngcp_pole],
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: true,
  title: "Proposed Pole Relocation",
});

/* PROW for SC Tunnel Alignment */
const prow_tunnel_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "3px",
    style: "dash",
  }),
});

export const prow_tunnelLayer = new FeatureLayer({
  portalItem: {
    id: "63605177aec648e5b3ad232d2b181874",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: prow_tunnel_renderer,
  popupEnabled: false,
  title: "PROW for Tunnel Alignment",
});

/* PNR */
const pnrRenderer = new UniqueValueRenderer({
  field: "OwnershipType",
  uniqueValueInfos: [
    {
      value: 1, // RP
      symbol: new SimpleFillSymbol({
        color: [137, 205, 102],
        style: "diagonal-cross",
        outline: {
          width: 0.5,
          color: "black",
        },
      }),
    },
    {
      value: 2, // PNR
      symbol: new SimpleFillSymbol({
        color: [137, 205, 102],
        style: "diagonal-cross",
        outline: {
          width: 0.5,
          color: "black",
        },
      }),
    },
  ],
});

export const pnrLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Land (Excluded for Acquisition)",
  definitionExpression: "OwnershipType IN (1, 2)",
  elevationInfo: {
    mode: "on-the-ground",
  },
  labelsVisible: false,
  renderer: pnrRenderer,
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{LandOwner} ({LotID})</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "OwnershipType",
            label: "Ownership Type",
          },
          {
            fieldName: "HandOverDate",
            label: "Hand-Over Date",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "LandOwner",
            label: "Land Owner",
          },
        ],
      },
    ],
  },
});

/* Station Layer */
const labelClass = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "#d4ff33",
        },
        size: 15,
        halo: {
          color: "black",
          size: 0.5,
        },
        // font: {
        //   family: 'Ubuntu Mono',
        //   //weight: "bold"
        // },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.Station",
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 6,
  title: "SC Stations",
  labelingInfo: [labelClass],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});
stationLayer.listMode = "hide";

/* The colors used for the each transit line */
const lotIdLabel = new LabelClass({
  labelExpressionInfo: { expression: "$feature.LotID" },
  symbol: {
    type: "text",
    color: "black",
    haloColor: "white",
    haloSize: 0.5,
    font: {
      size: 11,
      weight: "bold",
    },
  },
});

const lotDefaultSymbol = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  style: "solid",
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [110, 110, 110],
    width: 0.7,
  },
});

const uniqueValueInfosLotStatus = lotStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index + 1,
      label: status,
      symbol: new SimpleFillSymbol({
        color: lotStatusColor[index],
      }),
    });
  },
);
const lotLayerRenderer = new UniqueValueRenderer({
  field: lotStatusField,
  defaultSymbol: lotDefaultSymbol, // autocasts as new SimpleFillSymbol()
  uniqueValueInfos: uniqueValueInfosLotStatus,
});

// Custom popup for lot layer
const customContentLot = new CustomContent({
  outFields: ["*"],
  creator: (event: any) => {
    // Extract AsscessDate of clicked pierAccessLayer
    const handedOverDate = event.graphic.attributes[lotHandedOverDateField];
    const handOverArea = event.graphic.attributes[percentHandedOverField];
    const statusLot = event.graphic.attributes[lotStatusField];
    const landUse = event.graphic.attributes[landUseField];
    const municipal = event.graphic.attributes[municipalityField];
    const barangay = event.graphic.attributes[barangayField];
    const landOwner = event.graphic.attributes[landOwnerField];
    const cpNo = event.graphic.attributes[cpField];
    const endorse = event.graphic.attributes[endorsedField];
    const endorsed = endorsedStatus[endorse];

    let daten: any;
    let date: any;
    if (handedOverDate) {
      daten = new Date(handedOverDate);
      const year = daten.getFullYear();
      const month = daten.getMonth() + 1;
      const day = daten.getDate();
      date = `${year}-${month}-${day}`;
    } else {
      date = "Undefined";
    }
    // Convert numeric to date format 0
    //const daten = new Date(handedOverDate);
    //const date = dateFormat(daten, 'MM-dd-yyyy');
    //<li>Hand-Over Date: <b>${date}</b></li><br>

    return `
    <div style='color: #eaeaea'>
    <ul><li>Handed-Over Area:  <span style="color: #d9dc00ff; font-weight: bold">${handOverArea} %</span></li>
    <li>Handed-Over Date:  <span style="color: #d9dc00ff; font-weight: bold">${date}</span></li>
              <li>Status:            <span style="color: #d9dc00ff; font-weight: bold">${
                statusLot >= 0 ? lotStatusLabel[statusLot - 1] : ""
              }</span></li>
              <li>Land Use:          <span style="color: #d9dc00ff; font-weight: bold">${
                landUse >= 1 ? lotUseArray[landUse - 1] : ""
              }</span></li>
              <li>Municipality:     <span style="color: #d9dc00ff; font-weight: bold">${municipal}</span></li>
              <li>Barangay:          <span style="color: #d9dc00ff; font-weight: bold">${barangay}</span></li>
              <li>Land Owner:        <span style="color: #d9dc00ff; font-weight: bold">${landOwner}</span></li>
              <li>CP:                <span style="color: #d9dc00ff; font-weight: bold">${cpNo}</span></li>
              <li>Endorsed:          <span style="color: #d9dc00ff; font-weight: bold">${endorsed}</span></li></ul>
              </div>
              `;
  },
});

const templateLot = new PopupTemplate({
  title: "<div style='color: #eaeaea'>Lot No.: <b>{LotID}</b></div>",
  lastEditInfoEnabled: false,
  content: [customContentLot],
});

export const lotLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  labelingInfo: [lotIdLabel],
  renderer: lotLayerRenderer,
  popupTemplate: templateLot,
  title: "Land Acquisition",
  minScale: 150000,
  maxScale: 0,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});
// // //
/* Optmized lots for NSCR-Ex Passenger Line */
const optimizedLotRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "#bbbbbb",
    style: "diagonal-cross",
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "#FF5733", // [0, 255, 255, 1],
      width: "6px",
    },
  }),
});

export const optimizedLots_passengerLineLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: "OptLotsIIA_NoT = 1",
  labelingInfo: [lotIdLabel],
  renderer: optimizedLotRenderer,
  popupTemplate: templateLot,
  title: "Optimized Lots with Issued Notice of Taking",
  minScale: 150000,
  maxScale: 0,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Studied Lots of NSCR-Ex Freight Line for Optimization */
const studiedLotRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "#808080",
    style: "horizontal",
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "#808080", //#DF73FF,
      width: "6px",
    },
  }),
});

export const studiedLots_optimizationLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: "OptLotsIIB = 1",
  labelingInfo: [lotIdLabel],
  renderer: studiedLotRenderer,
  popupTemplate: templateLot,
  title: "Candidate Lots of NSCR-Ex Passenger & Freight Line for Optimization",
  minScale: 150000,
  maxScale: 0,
  //labelsVisible: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Handed-Over Lot (public + private) */
const handedOverLotRenderer = new UniqueValueRenderer({
  field: "HandedOver",

  uniqueValueInfos: [
    {
      value: 1,
      label: "Handed-Over",
      symbol: new SimpleFillSymbol({
        color: [0, 255, 255, 0.3], //[0, 255, 255, 0.1], #00ffff
        outline: new SimpleLineSymbol({
          color: "#00ffff",
          width: "4px",
        }),
      }),
    },
  ],
});

export const handedOverLotLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: `${lotHandedOverField} = 1`,
  renderer: handedOverLotRenderer,
  popupEnabled: false,
  labelsVisible: false,
  title: "Handed-Over (public + private)",
  elevationInfo: {
    mode: "on-the-ground",
  },
});
handedOverLotLayer.listMode = "hide";

const tunnelAffectedLotRenderer = new UniqueValueRenderer({
  field: tunnelAffectLotField,
  uniqueValueInfos: [
    {
      value: 1,
      label: "Tunnel Affected",
      symbol: new SimpleFillSymbol({
        color: [255, 0, 0, 0],
        outline: {
          color: "#00c5ff",
          width: 0.3,
        },
      }),
    },
  ],
});

export const tunnelAffectedLotLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  definitionExpression: `${tunnelAffectLotField} = 1`,
  renderer: tunnelAffectedLotRenderer,
  popupEnabled: false,
  labelsVisible: false,
  title: "Tunnel Affected",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Endorsed Lot Layer */
// Endorsed lot layer
// let endorsedLayerRenderer = new UniqueValueRenderer({
//   field: 'Endorsed',
//   defaultSymbol: lotDefaultSymbol,
//   uniqueValueInfos: [
//     {
//       value: 0,
//       label: 'Not Endorsed',
//       symbol: new SimpleFillSymbol({
//         color: colorLotReqs[5],
//       }),
//     },
//     {
//       value: 1,
//       label: 'Endorsed',
//       symbol: new SimpleFillSymbol({
//         color: colorLotReqs[2],
//       }),
//     },
//     {
//       value: 2,
//       label: 'NA',
//       symbol: new SimpleFillSymbol({
//         color: [211, 211, 211, 0.7],
//       }),
//     },
//   ],
// });

// export const endorsedLotLayer = new FeatureLayer({
//   portalItem: {
//     id: 'dca1d785da0f458b8f87638a76918496',
//     portal: {
//       url: 'https://gis.railway-sector.com/portal',
//     },
//   },
//   layerId: 7,
//   renderer: endorsedLayerRenderer,
//   labelingInfo: [lotIdLabel],
//
//   title: 'Land Acquisition (Endorsed Status)',
//   minScale: 150000,
//   maxScale: 0,
//   //labelsVisible: false,
//   elevationInfo: {
//     mode: 'on-the-ground',
//   },
// });
// endorsedLotLayer.popupTemplate = templateLot;

/* Supre Urgent Lots */
// const superUrgentLotRenderer = new UniqueValueRenderer({
//   field: 'Urgent',

//   uniqueValueInfos: [
//     {
//       value: 0,
//       label: 'Super Urgent',
//       symbol: new SimpleFillSymbol({
//         color: [255, 0, 0, 0],
//         outline: {
//           color: [255, 0, 0, 1],
//           width: 0.3,
//         },
//       }),
//     },
//   ],
// });

// export const superUrgentLotLayer = new FeatureLayer({
//   portalItem: {
//     id: 'dca1d785da0f458b8f87638a76918496',
//     portal: {
//       url: 'https://gis.railway-sector.com/portal',
//     },
//   },
//   layerId: 7,
//   definitionExpression: 'Urgent = 0',
//   renderer: superUrgentLotRenderer,
//   popupEnabled: false,
//   labelsVisible: false,
//   title: 'Super Urgent Lot',
//   elevationInfo: {
//     mode: 'on-the-ground',
//   },
// });

/* contractor accessible layer */
const accessible_renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "purple",
    // style: 'cross',
    style: "solid",

    outline: {
      width: 1,
      color: "black",
    },
  }),
});
export const accessibleLotAreaLayer = new FeatureLayer({
  portalItem: {
    id: "4692e76be5804db2b38c23df86c7eaa8",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },

  renderer: accessible_renderer,
  title: "Handed-Over Area",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Structure Layer */
const height = 5;
const edgeSize = 0.3;

const defaultStructureRenderer = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: 5,
      material: {
        color: [0, 0, 0, 0.4],
      },
      edges: new SolidEdges3D({
        color: "#4E4E4E",
        size: edgeSize,
      }),
    }),
  ],
});

const uniqueValueInfosStrucStatus = structureStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index + 1,
      symbol: new PolygonSymbol3D({
        symbolLayers: [
          new ExtrudeSymbol3DLayer({
            size: height,
            material: {
              color: structureStatusColorRgb[index],
            },
            edges: new SolidEdges3D({
              color: "#4E4E4E",
              size: edgeSize,
            }),
          }),
        ],
      }),
      label: status,
    });
  },
);
const structureRenderer = new UniqueValueRenderer({
  defaultSymbol: defaultStructureRenderer,
  defaultLabel: "Other",
  field: structureStatusField,
  uniqueValueInfos: uniqueValueInfosStrucStatus,
});

export const structureLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Structure",
  renderer: structureRenderer,

  elevationInfo: {
    mode: "on-the-ground",
  },
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{StrucID}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StrucOwner",
            label: "Structure Owner",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "StatusStruc",
            label: "<p>Status for Structure</p>",
          },
          {
            fieldName: "Name",
          },
          {
            fieldName: "Status",
            label: "Households Ownership (structure) ",
          },
        ],
      },
    ],
  },
});

// NLO Layer
const symbolSize = 30;

const uniqueValueInfosNlo = nloStatusLabel.map((_status: any, index: any) => {
  return Object.assign({
    value: index + 1,
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          resource: {
            href: nloStatusSymbolRef[index],
          },
          size: symbolSize,
          outline: {
            color: "white",
            size: 2,
          },
        }),
      ],
    }),
  });
});
const nloRenderer = new UniqueValueRenderer({
  field: nloStatusField,
  uniqueValueInfos: uniqueValueInfosNlo,
});

export const nloLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  renderer: nloRenderer,

  title: "Households",
  elevationInfo: {
    mode: "relative-to-scene",
  },
  minScale: 10000,
  maxScale: 0,
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{StrucID}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StrucOwner",
            label: "Structure Owner",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "StatusRC",
            label: "<p>Status for Relocation</p>",
          },
          {
            fieldName: "Name",
          },
          {
            fieldName: "Status",
            label: "Households Ownership (structure) ",
          },
        ],
      },
    ],
  },
});

/* Structure Ownership Layer */
const uniqueValueInfosStrucOwnership = structureOwnershipStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index + 1,
      label: status,
      symbol: new SimpleFillSymbol({
        style: "forward-diagonal",
        color: structureOwnershipColor[index],
        outline: {
          color: "#6E6E6E",
          width: 0.3,
        },
      }),
    });
  },
);
const structureOwnershipRenderer = new UniqueValueRenderer({
  field: structureOwnershipStatusField,
  uniqueValueInfos: uniqueValueInfosStrucOwnership,
});

export const strucOwnershipLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  renderer: structureOwnershipRenderer,
  layerId: 2,
  title: "Households Ownership (Structure)",

  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* Occupancy (Status of Relocation) */
const verticalOffsetExistingOccupancy = {
  screenLength: 10,
  maxWorldLength: 10,
  minWorldLength: 10,
};
const occupancyPointSize = 20;

const uniqueValueInfosOccupancy = structureOccupancyStatusLabel.map(
  (status: any, index: any) => {
    return Object.assign({
      value: index,
      label: status,
      symbol: new PointSymbol3D({
        symbolLayers: [
          new IconSymbol3DLayer({
            resource: {
              href: structureOccupancyRef[index],
            },
            size: occupancyPointSize,
            outline: {
              color: "white",
              size: 2,
            },
          }),
        ],
        verticalOffset: verticalOffsetExistingOccupancy,

        callout: {
          type: "line", // autocasts as new LineCallout3D()
          color: [128, 128, 128, 0.6],
          size: 0.4,
          border: {
            color: "grey",
          },
        },
      }),
    });
  },
);

const occupancyRenderer = new UniqueValueRenderer({
  field: structureOccupancyStatusField,
  uniqueValueInfos: uniqueValueInfosOccupancy,
});

export const occupancyLayer = new FeatureLayer({
  portalItem: {
    id: "99500faf0251426ea1df934a739faa6f",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,

  title: "Occupancy (Structure)",
  renderer: occupancyRenderer,
  elevationInfo: {
    mode: "relative-to-scene",
  },
  popupTemplate: {
    title: "<div style='color: #eaeaea'>{StrucID}</div>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StrucOwner",
            label: "Structure Owner",
          },
          {
            fieldName: "Municipality",
          },
          {
            fieldName: "Barangay",
          },
          {
            fieldName: "Occupancy",
            label: "<p>Status for Relocation(structure)</p>",
          },
          {
            fieldName: "Name",
          },
          {
            fieldName: "Status",
            label: "Households Ownership",
          },
        ],
      },
    ],
  },
});

/* Pier Head and Column */
const pHeight = 0;

const pierColumn = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: pHeight + 10,
      material: {
        color: [78, 78, 78, 0.5],
      },
      edges: new SolidEdges3D({
        color: "#4E4E4E",
        size: 0.3,
      }),
    }),
  ],
});

const pileCap = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: pHeight + 3,
      material: {
        color: [200, 200, 200, 0.7],
      },
      edges: new SolidEdges3D({
        color: "#4E4E4E",
        size: 1.0,
      }),
    }),
  ],
});

const pierHeadRenderer = new UniqueValueRenderer({
  // defaultSymbol: new PolygonSymbol3D({
  //   symbolLayers: [
  //     {
  //       type: "extrude",
  //       size: 5, // in meters
  //       material: {
  //         color: "#E1E1E1",
  //       },
  //       edges: new SolidEdges3D({
  //         color: "#4E4E4E",
  //         size: 1.0,
  //       }),
  //     },
  //   ],
  // }),
  // defaultLabel: "Other",
  field: "Layer",
  legendOptions: {
    title: "Pile Cap/Column",
  },
  uniqueValueInfos: [
    {
      value: "Pier_Column",
      symbol: pierColumn,
      label: "Column",
    },
    /*
  {
    value: "Pier_Head",
    symbol: pierHead,
    label: "Pier Head"
  },
  */
    {
      value: "Pile_Cap",
      symbol: pileCap,
      label: "Pile Cap",
    },
  ],
});

export const pierHeadColumnLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  title: "Pile Cap/Column",
  definitionExpression: "Layer <> 'Pier_Head'",

  minScale: 150000,
  maxScale: 0,
  renderer: pierHeadRenderer,
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});
// pierHeadColumnLayer.listMode = "hide";

/* Pier Access Point  */
const defaultPierAccessLabel = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: valueLabelColor,
        },
        size: 15,
        font: {
          family: "Ubuntu Mono",
          weight: "bold",
        },
      }),
    ],
    verticalOffset: {
      screenLength: 80,
      maxWorldLength: 500,
      minWorldLength: 30,
    },
    callout: {
      type: "line",
      size: 0.5,
      color: [0, 0, 0],
      border: {
        color: [255, 255, 255, 0.7],
      },
    },
  }),
  labelExpressionInfo: {
    expression: "$feature.PierNumber",
    //'DefaultValue($feature.GeoTechName, "no data")'
    //"IIF($feature.Score >= 13, '', '')"
    //value: "{Type}"
  },
  labelPlacement: "above-center",
  // where: 'AccessDate IS NULL',
});

export const pierAccessLayer = new FeatureLayer(
  {
    portalItem: {
      id: "e09b9af286204939a32df019403ef438",
      portal: {
        url: "https://gis.railway-sector.com/portal",
      },
    },
    layerId: 3,
    labelingInfo: [defaultPierAccessLabel], // [pierAccessReadyDateLabel, pierAccessNotYetLabel, pierAccessDateMissingLabel], //[pierAccessDateMissingLabel, pierAccessReadyDateLabel, pierAccessNotYetLabel],
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

const cp_break_line_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#4ce600",
    width: "2px",
  }),
});
export const cp_break_lines = new FeatureLayer({
  portalItem: {
    id: "1a2be501a0f54e048a7200e482eb0dd5",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  title: "CP Break Line",
  renderer: cp_break_line_renderer,
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* For SC Substation */
const scSubstationRenderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [115, 178, 255],
    style: "backward-diagonal",
    outline: {
      color: "#004DA8",
      width: 1.5,
    },
  }),
});

export const substationLayer = new FeatureLayer({
  portalItem: {
    id: "fd0fd77c428b4fae8f47ac46b26614ec",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 61,
  renderer: scSubstationRenderer,
  popupEnabled: false,
  labelsVisible: false,
  title: "Substation",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* For SC Future Track */
const scFutureTrack = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#C2C7FC",
    width: "3px",
    style: "solid",
  }),
});

export const scFutureTrackLayer = new FeatureLayer({
  portalItem: {
    id: "a0ec0ab1c19c4927b0934b524e398a6a",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 64,
  renderer: scFutureTrack,
  popupEnabled: false,
  labelsVisible: false,
  title: "Future Track",
  elevationInfo: {
    mode: "on-the-ground",
  },
});

// Group layers //
export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [
    stationBoxLayer,
    chainageLayer,
    prow_tunnelLayer,
    cp_break_lines,
    pierHeadColumnLayer,
    substationLayer,
    scFutureTrackLayer,
    meralco_site1_prowLayer,
    prowLayerold,
    prowLayer,
  ],
}); //map.add(alignmentGroupLayer, 0);

export const nloLoOccupancyGroupLayer = new GroupLayer({
  title: "Households Occupancy",
  visible: true,
  visibilityMode: "independent",
  layers: [occupancyLayer, strucOwnershipLayer, nloLayer],
});

export const lotGroupLayer = new GroupLayer({
  title: "Land",
  visible: true,
  visibilityMode: "independent",
  layers: [
    lotLayer,
    optimizedLots_passengerLineLayer,
    studiedLots_optimizationLayer,
    tunnelAffectedLotLayer,
    pnrLayer,
    accessibleLotAreaLayer,
  ],
});

export const ngcp6_groupLayer = new GroupLayer({
  title: "NGCP Site 6",
  visible: false,
  visibilityMode: "independent",
  layers: [ngcp_line6, ngcp_pole6, ngcp_working_area6],
});

export const ngcp7_groupLayer = new GroupLayer({
  title: "NGCP Site 7",
  visible: false,
  // listMode: 'hide-children',
  visibilityMode: "independent",
  // layers: [ngcp_line7, ngcp_pole7, ngcp_working_area7],
  layers: [ngcp_line7, ngcp_pole7],
});

//###################################
