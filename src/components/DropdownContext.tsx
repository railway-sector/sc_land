import { useEffect, useState, use } from "react";
import Select from "react-select";
import "../index.css";
import "../App.css";
import { MyContext } from "../contexts/MyContext";
import GenerateDropdownData from "npm-dropdown-package";
import { lotLayer } from "../fLayers";
export default function DropdownData() {
  const { updateMunicipals, updateBarangays } = use(MyContext);

  const [initMunicipalBarangay, setInitMunicipalBarangay] = useState<any>();
  const [municipalitySelected, setMunicipalitySelected] = useState(null);

  const [barangaySelected, setBarangaySelected] = useState(null);
  const [barangayList, setBarangayList] = useState([]);
  const [lotLayerLoaded, setLotLayerLoaded] = useState(false);

  useEffect(() => {
    lotLayer.when(() => {
      setLotLayerLoaded(true);
    });

    const dropdownData = new GenerateDropdownData(
      [lotLayer],
      ["Municipality", "Barangay"],
    );

    dropdownData.dropDownQuery().then((response: any) => {
      setInitMunicipalBarangay(response);
    });
  }, []);

  // handle change event of the Municipality dropdown
  const handleMunicipalityChange = (obj: any) => {
    setMunicipalitySelected(obj);
    setBarangayList(obj.field2);
    setBarangaySelected(null);
    updateMunicipals(obj.field1);
    updateBarangays(undefined);
  };

  // handle change event of the barangay dropdownff
  const handleBarangayChange = (obj: any) => {
    setBarangaySelected(obj);
    updateBarangays(obj.name);
  };

  // Style CSS
  const customstyles = {
    option: (styles: any, { isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#999999"
          : isSelected
            ? "#2b2b2b"
            : "#2b2b2b",
        color: "#ffffff",
      };
    },

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      color: "#ffffff",
      touchUi: false,
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <>
      {lotLayerLoaded && (
        <div className="dropdownFilterLayout">
          <div
            style={{
              color: "white",
              fontSize: "0.85rem",
              margin: "auto",
              paddingRight: "0.5rem",
            }}
          >
            Municipality
          </div>
          <Select
            placeholder="Select Municipality"
            value={municipalitySelected}
            options={initMunicipalBarangay}
            onChange={handleMunicipalityChange}
            getOptionLabel={(x: any) => x.field1}
            styles={customstyles}
          />
          <br />
          <div
            style={{
              color: "white",
              fontSize: "0.85rem",
              margin: "auto",
              paddingRight: "0.5rem",
              paddingLeft: "10px",
            }}
          >
            Barangay
          </div>
          <Select
            placeholder="Select Barangay"
            value={barangaySelected}
            options={barangayList}
            onChange={handleBarangayChange}
            getOptionLabel={(x: any) => x.name}
            styles={customstyles}
          />
        </div>
      )}
    </>
  );
}
