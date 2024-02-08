import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Trabajadores } from "../pages/Trabajadores";
import { Fichajes } from "../pages/Fichajes";
import { Liquidaciones } from "../pages/Liquidaciones";
import { Nomina } from "../pages/Nomina";
export function MyRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Fichajes" element={<Fichajes />} />
        <Route path="/Trabajadores" element={<Trabajadores />} />
        <Route path="/Liquidaciones" element={<Liquidaciones />} />
        <Route path="/Nomina" element={<Nomina />} />
      </Routes>
  );
}
