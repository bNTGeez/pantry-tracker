"use client";
import { Container, Typography, Button } from "@mui/material";
import PantryPage from "./pantry-list-items/page.js";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Pantry Tracker
      </Typography>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          mt: 4,
        }}
      >
        <Button
          onClick={() => router.push("/add-items")}
          variant="contained"
          sx={{
            width: "auto",
            height: "auto",
            mx: 1,
          }}
        >
          Add Items
        </Button>
      </Container>

      <PantryPage />
    </>
  );
}
