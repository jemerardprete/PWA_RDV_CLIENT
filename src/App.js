import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AppRoutes from "./Routes";

const App = () => {
    return (
        <div>
            <AppHeader />
            <AppRoutes />
        </div>
    );
};

export default App;