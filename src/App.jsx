import { AppRouter } from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
