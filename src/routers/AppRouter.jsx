import { useRoutes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./auth/AuthRoutes";
import { HomeLayout } from "../components/layouts/HomeLayout";
import { HomeRoutes } from "./home/HomeRoutes";

export function AppRouter() {
    return useRoutes([
        {
            path: '/auth/*',
            element: (
                <PublicRoutes>
                    <AuthRoutes/>
                </PublicRoutes>
            )
        },
        {
            path: '/*',
            element: (
                <PrivateRoutes>
                    <HomeLayout>
                        <HomeRoutes/>
                    </HomeLayout>
                </PrivateRoutes>
            )
        }
    ]);
}
