import { useRoutes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./auth/AuthRoutes";
import { HomeLayout } from "../components/layouts/HomeLayout";
import { HomeRoutes } from "./home/HomeRoutes";

export function AppRouter() {
    const { token } = useAuth();

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
