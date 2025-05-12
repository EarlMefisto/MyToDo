import {
  changeThemeModeAC,
  selectIsLoggedIn,
  selectStatus,
  selectThemeMode,
  setIsLoggedInAC,
} from "@/app/appSlice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { baseApi } from "@/app/baseApi"
import LinearProgress from "@mui/material/LinearProgress"
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../SearchField/SearchField"
import SearchIcon from "@mui/icons-material/Search"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [logout] = useLogoutMutation()

  const changeMode = () => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === "light" ? "dark" : "light",
      }),
    )
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        //нужно использовать с осторожностью,
        //т.к. это зачищает все данные, состояния загрузки и ошибки
        // dispatch(baseApi.util.resetApiState())
        //зачищает определённый запрос (под тэгом)
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <div>
            {isLoggedIn && (
              <NavButton onClick={logoutHandler}>Log Out</NavButton>
            )}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
