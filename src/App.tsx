import { useState, useEffect } from "react";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import Portal from "@arcgis/core/portal/Portal";
import "./App.css";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalciteShell } from "@esri/calcite-components-react";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import MainChart from "./components/MainChart";
import { MyContext } from "./contexts/MyContext";

function App() {
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    const info = new OAuthInfo({
      appId: "AY0soYzKroa8akoy",
      popup: false,
      portalUrl: "https://gis.railway-sector.com/portal",
    });

    IdentityManager.registerOAuthInfos([info]);
    async function loginAndLoadPortal() {
      try {
        await IdentityManager.checkSignInStatus(info.portalUrl + "/sharing");
        const portal: any = new Portal({
          // access: "public",
          url: info.portalUrl,
          authMode: "no-prompt",
        });
        portal.load().then(() => {
          setLoggedInState(true);
          console.log("Logged in as: ", portal.user.username);
        });
      } catch (error) {
        console.error("Authentication error:", error);
        IdentityManager.getCredential(info.portalUrl);
      }
    }
    loginAndLoadPortal();
  }, []);

  const [municipals, setMunicipals] = useState<any>();
  const [barangays, setBarangays] = useState<any>();

  const updateMunicipals = (newMunicipal: any) => {
    setMunicipals(newMunicipal);
  };

  const updateBarangays = (newBarangay: any) => {
    setBarangays(newBarangay);
  };

  return (
    <>
      {loggedInState === true ? (
        <div>
          <CalciteShell
            style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #555" }}
          >
            <MyContext
              value={{
                municipals,
                barangays,
                updateMunicipals,
                updateBarangays,
              }}
            >
              <ActionPanel />
              <MapDisplay />
              <MainChart />
              <Header />
            </MyContext>
          </CalciteShell>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
