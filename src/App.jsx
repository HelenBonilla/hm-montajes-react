import { AppRouter } from "./routers/AppRouter";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
