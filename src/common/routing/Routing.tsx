import { Main } from "@/app/Main"
import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"
import { useAppSelector } from "../hooks"
import { selectIsLoggedIn } from "@/app/appSlice"
import { PageNotFound, ProtectedRoute } from "../components"

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />
        }
      >
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
