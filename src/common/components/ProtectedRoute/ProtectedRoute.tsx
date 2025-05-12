import { Path } from "@/common/routing/Routing"
import { Navigate, Outlet } from "react-router"

type ProtectedRouteProps = {
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = Path.Main,
}: ProtectedRouteProps) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />
}
