import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";

import InputBase from "@mui/material/InputBase";
import LightIcon from "@mui/icons-material/LightModeOutlined";
import DarkIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationIcon from "@mui/icons-material/NotificationsOutlined";
import SettingIcon from "@mui/icons-material/SettingsOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            {/* Thanh tìm kiếm */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="5px"
                borderColor={"#000000"}
            >
                <InputBase sx={{ ml: 2, flex: 1, color: colors.text, placeholder: colors.text }} placeholder="Tìm kiếm" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">

                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkIcon />
                    ) : (
                        <LightIcon />
                    )}
                </IconButton>

                <IconButton>
                    <NotificationIcon />
                </IconButton>


                <IconButton>
                    <SettingIcon />
                </IconButton>

                <IconButton>
                    <PersonIcon />
                </IconButton>


            </Box>
        </Box>
    );
};

export default Topbar;
