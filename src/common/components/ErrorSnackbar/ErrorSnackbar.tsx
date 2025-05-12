import { selectAppError, setAppErrorAC } from "@/app/appSlice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { SyntheticEvent } from "react"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppErrorAC({ error: null }))
  }

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        color="error"
        security="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}
