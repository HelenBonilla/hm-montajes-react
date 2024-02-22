import { Routes, Route } from 'react-router-dom'
import { Fichajes } from "../../pages/Fichajes";
import { Trabajadores } from "../../pages/Trabajadores";
import ViewWorkers from "../../components/workers/viewWorkers";
import { Liquidaciones } from "../../pages/Liquidaciones";
import { DataDetailedSte } from "../../components/settlement/detailedInformation";
import { Nomina } from "../../pages/Nomina";

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path={'/fichajes'} element={<Fichajes />} />
            <Route path={'/trabajadores'} element={<Trabajadores />} />
            <Route path={'/trabajadores/:id'} element={<ViewWorkers />} />
            <Route path={'/liquidaciones'} element={<Liquidaciones />} />
            <Route path={'/liquidaciones/:id'} element={<DataDetailedSte />} />
            <Route path={'/nomina'} element={<Nomina />} />
        </Routes>
    );
}
