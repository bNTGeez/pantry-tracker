"use client";
import styles from "./page.module.css";
import { Container, Typography, Box } from "@mui/material";
//import { PieChart } from '@mui/x-charts/PieChart';
import { PieChart } from '@mui/x-charts';

import { useState } from "react";

export default function Home() {
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Pantry Tracker
      </Typography>

      <Container
        sx={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "Monospace",
          display: "flex",
          marginTop: "30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          height={100}
          width={200}
          mx={4}
          py={2}
          sx={{ border: "2px solid grey" }}
        >
          Total Items
          {totalItems}
        </Box>
        <Box
          height={100}
          width={200}
          mx={4}
          py={2}
          sx={{ border: "2px solid grey" }}
        >
          Total Quantities
          {totalQuantities}
        </Box>
        <Box
          height={100}
          width={200}
          mx={4}
          py={2}
          sx={{ border: "2px solid grey" }}
        >
          Total Categories
          {totalCategories}
        </Box>
      </Container>
      <Container 
        sx = {{
          my: "40px",
          justifyContent: "center",
          display: "flex",

          }}>
      <Box
          height={400}
          width={800}
          mx={4}
          py={2}
          sx={{ border: "2px solid grey", textAlign: "center" }}
          pt = {6}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
                ],
              },
            ]}
            width={600}
            height={300}
            my= "40px"
          />
          
        </Box>
      </Container>
    </>
  );
}
