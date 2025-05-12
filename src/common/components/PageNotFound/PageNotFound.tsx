import Button from "@mui/material/Button"
import styles from "./PageNotFound.module.css"
import { Link } from "react-router"
import Container from "@mui/material/Container"

export const PageNotFound = () => (
  <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        style={{
          width: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ВЕРНУТЬСЯ НА ГЛАВНУЮ
      </Button>
    </div>
  </Container>
)
