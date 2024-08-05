"use client";
import styles from "./page.module.css";
import { Container, Typography, Box, Button } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import PantryPage from "./pantry-list-items/page.js";
import SearchBar from "./components/Searchbar.js";
import { fetchTotalItems } from "./utils/utils.js";

import { useState, useEffect } from "react";

export default function Home() {
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const updateTotals = async () => {
      const { totalItems, totalQuantities } = await fetchTotalItems();
      setTotalItems(totalItems);
      setTotalQuantities(totalQuantities);
    };

    updateTotals();
  }, []);

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
