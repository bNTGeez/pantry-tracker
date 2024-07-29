import React from "react";
import { Button, Container, Box, TextField, Typography } from "@mui/material";

const page = () => {
  return (
    <div>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Add Item
      </Typography>
      <Container 
      sx = {{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Box
          height="auto"
          width="800px"
          mt={2}
          p={4}
          sx={{
            border: "2px solid grey",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField label="Item Name" type="text" />
          <TextField label="Description" type="text" />
          <TextField label="Quantity" type="number" />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Expiration Date"
            type="date"
          />
          <Button variant = "contained">
            Add
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default page;
