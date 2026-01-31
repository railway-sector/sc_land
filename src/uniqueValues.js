import Collection from "@arcgis/core/core/Collection";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import { highlightLot } from "./Query";
import { tunnelAffectedLotLayer } from "./layers";
const arcgisScene = document.querySelector("arcgis-scene");

// chart width
export const chart_width = "26vw";

// Updated Dates
export const updatedDateCategoryNames = [
  "Land Acquisition",
  "Structure",
  "Non Land Owner",
];
export const cutoff_days = 30;

// Lot fields definitions
export const lotHandOverDateField = "HandOverDate";
export const lotTargetActualField = "TargetActual";
export const lotTargetActualDateField = "TargetActualDate";

export const lotIdField = "LotID";
export const lotPriorityField = "Priority1_1";
export const lotStatusField = "StatusLA";
export const municipalityField = "Municipality";
export const barangayField = "Barangay";
export const landOwnerField = "LandOwner";
export const cpField = "CP";
export const landUseField = "LandUse";
export const endorsedField = "Endorsed";
export const lotHandedOverField = "HandedOver";
export const lotHandedOverDateField = "HandedOverDate";
export const lotHandedOverAreaField = "HandedOverArea";
export const percentHandedOverField = "percentHandedOver";
export const tunnelAffectLotField = "TunnelAffected";
export const affectedAreaField = "AffectedArea";

// Lot Status

export const lotStatusLabel = [
  "Paid",
  "For Payment Processing",
  "For Legal Pass",
  "For Offer to Buy",
  "For Notice of Taking",
  "With PTE",
  "For Expropriation",
  "Harmonized/Optimized",
];

export const lotStatusColor = [
  "#00734d",
  "#0070ff",
  "#ffff00",
  "#ffaa00",
  "#FF5733",
  "#70AD47",
  "#FF0000",
  "#B2B2B2",
];
export const lotStatusQuery = lotStatusLabel.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
    color: lotStatusColor[index],
  });
});

export const lotUseArray = [
  "Agricultural",
  "Agricultural & Commercial",
  "Agricultural / Residential",
  "Commercial",
  "Industrial",
  "Irrigation",
  "Residential",
  "Road",
  "Road Lot",
  "Special Exempt",
];

// Lot Endorsed
export const endorsedStatus = ["Not Endorsed", "Endorsed", "NA"];

// Lot MOA
export const lotMoaField = "MoA";
export const lotMoaStatus = [
  "For Negotiation",
  "Expropriation",
  "Donation",
  "CA 141",
  "No Need to Acquire",
];
export const lotMoaStatusQuery = lotMoaStatus.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
  });
});

// Structure
export const structureStatusField = "StatusStruc";
export const structureIdField = "StrucID";
export const structureStatusLabel = [
  "Demolished",
  "Paid",
  "For Payment Processing",
  "For Legal Pass",
  "For Offer to Compensate",
  "For Notice of Taking",
  "No Need to Acquire",
];

export const structureStatusColorHex = [
  "#00C5FF",
  "#70AD47",
  "#0070FF",
  "#FFFF00",
  "#FFAA00",
  "#FF5733",
  "#B2BEB5",
];
export const structureStatusColorRgb = [
  [0, 197, 255, 0.6],
  [112, 173, 71, 0.6],
  [0, 112, 255, 0.6],
  [255, 255, 0, 0.6],
  [255, 170, 0, 0.6],
  [255, 83, 73, 0.6],
  [178, 190, 181, 0.6],
];

export const structureStatusQuery = structureStatusLabel.map(
  (status, index) => {
    return Object.assign({
      category: status,
      value: index + 1,
      colorLayer: structureStatusColorRgb[index],
      color: structureStatusColorHex[index],
    });
  },
);

// Permit to Enter for structure
export const structurePteField = "PTE";

// Structure MOA
export const structureMoaField = "MoA";
export const structureMoaStatus = [
  "For Negotiation",
  "Expropriation",
  "Donation",
  "No Need to Acquire",
];

export const structureMoaQuery = structureMoaStatus.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
  });
});

// NLO
export const nloStatusField = "StatusRC";
export const nloStatusLabel = [
  "Relocated",
  "Paid",
  "For Payment Processing",
  "For Legal Pass",
  "For Appraisal/OtC/Requirements for Other Entitlements",
  "LBP Account Opening",
];
export const nloStatusColor = [
  "#00C5FF",
  "#70AD47",
  "#0070FF",
  "#FFFF00",
  "#FFAA00",
  "#FF0000",
];

export const nloStatusSymbolRef = [
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_Relocated.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_Paid.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_PaymentProcess.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_LegalPass.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_OtC.svg",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/ISF/ISF_LBP.svg",
];

export const nloStatusQuery = nloStatusLabel.map((status, index) => {
  return Object.assign({
    category: status,
    value: index + 1,
    color: nloStatusColor[index],
  });
});

// Structure Ownership
export const structureOwnershipStatusField = "Status";
export const structureOwnershipStatusLabel = ["LO (Land Owner)", "Households"];
export const structureOwnershipColor = [
  [128, 128, 128, 1],
  [128, 128, 128, 1],
];

// Structure Occupancy
export const structureOccupancyStatusField = "Occupancy";
export const structureOccupancyStatusLabel = ["Occupied", "Relocated"];
export const structureOccupancyRef = [
  "https://EijiGorilla.github.io/Symbols/Demolished.png",
  "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
];

// Pier Access layer
export const pierAccessValue = ["empty", "accessible", "others"];
export const pierAccessValueLabel = [
  "Dates are missing",
  "Accessible",
  "Others",
];
export const pierAccessValueDateColor = [
  [255, 0, 0, 0.9], // Missing
  [0, 255, 0, 0.9], // Accessible
  [255, 255, 255, 0.9], // Dates are missing
];

export const pierAccessStatusField = "AccessStatus";
export const pierAccessBatchField = "BatchNo";

// Handed Over Date and Handed Over Area
export const handedOverLotField = "HandedOver";

// Chart and chart label color
export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";

// Layter list
export async function defineActions(event) {
  const { item } = event;

  // NGCP Site 6
  if (item.title === "Proposed Pole Working Areas") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcpwa6",
        }),
      ]),
    ]);
  }

  if (item.title === "Proposed/Recorded NGCP Lines") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcpline6",
        }),
      ]),
    ]);
  }

  if (item.title === "Proposed Pole Relocation") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcppolerelo6",
        }),
      ]),
    ]);
  }

  // NGCP Site 7
  // if (item.title === "Proposed Pole Working Areas") {
  //   item.actionsSections = new Collection([
  //     new Collection([
  //       new ActionButton({
  //         title: "Zoom to Area",
  //         icon: "zoom-in-fixed",
  //         id: "full-extent-ngcpwa7",
  //       }),
  //     ]),
  //   ]);

  //   // highlightLot(ngcp_tagged_structureLayer);
  // }

  if (item.title === "Proposed/Recorded NGCP Lines") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcpline7",
        }),
      ]),
    ]);
  }

  if (item.title === "Proposed Pole Relocation") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Area",
          icon: "zoom-in-fixed",
          id: "full-extent-ngcppolerelo7",
        }),
      ]),
    ]);
  }

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  if (item.title === "Super Urgent Lot") {
    // highlightLot(superUrgentLotLayer);
  } else if (item.title === "Handed-Over (public + private)") {
    // highlightLot(handedOverLotLayer);
  } else if (item.title === "Tunnel Affected") {
    highlightLot(tunnelAffectedLotLayer, arcgisScene);
  }

  item.title === "Chainage" ||
  item.title === "SC Alignment 7.1.6" ||
  item.title === "Substation" ||
  item.title === "Future Track" ||
  item.title === "Households Ownership (Structure)" ||
  item.title === "Super Urgent Lot" ||
  item.title === "Handed-Over (public + private)" ||
  item.title === "For Land Optimization" ||
  item.title === "Tunnel Affected" ||
  item.title === "Structure" ||
  item.title === "Households" ||
  item.title === "Occupancy (Structure)" ||
  item.title === "Proposed Pole Working Areas" ||
  item.title === "Proposed/Recorded NGCP Lines" ||
  item.title === "Proposed Pole Relocation" ||
  item.title === "Handed-Over Area"
    ? (item.visible = false)
    : (item.visible = true);
}
