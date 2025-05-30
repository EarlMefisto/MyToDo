import type { ThemeMode } from "@/app/appSlice"
import { createTheme } from "@mui/material/styles"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#5d478b",
      },
    },
  })
}
