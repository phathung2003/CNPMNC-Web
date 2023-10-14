import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

import Topbar from "./global/Topbar";

export default function dashboardMain() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className="content">

                        {/* Thanh header */}
                        <Topbar />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

