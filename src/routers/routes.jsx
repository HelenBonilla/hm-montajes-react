import { Routes, Route } from "react-router-dom";
import { Trabajadores } from "../pages/Trabajadores";
import { Fichajes } from "../pages/Fichajes";
import { Liquidaciones } from "../pages/Liquidaciones";
import { Nomina } from "../pages/Nomina";
import { DataDetailedSte } from "../components/settlement/detailedInformation";

export function MyRoutes() {
  return (
      <Routes>
        <Route path="/Fichajes" element={<Fichajes />} />
        <Route path="/Trabajadores" element={<Trabajadores />} />
        <Route path="/Liquidaciones" element={<Liquidaciones />} />
        <Route path="/Liquidaciones/:id" element={<DataDetailedSte />} />
        <Route path="/Nomina" element={<Nomina />} />
      </Routes>
  );
}
