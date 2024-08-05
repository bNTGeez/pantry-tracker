"use client";
import React, { useState } from "react";
import { Button, Container, Box, TextField, Typography } from "@mui/material";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [newInput, setNewInput] = useState({
    name: "",
    quantity: 0,
    date: new Date(),
  });

  const addItem = async (e) => {
    e.preventDefault();
    if (
      newInput.name !== "" &&
      newInput.quantity !== "" &&
      newInput.date != ""
    ) {
      const q = query(
        collection(db, "items"),
        where("name", "==", newInput.name.trim()),
        where("date", "==", newInput.date)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();
        const newQuantity =
          Number(existingData.quantity || 0) + Number(newInput.quantity);
        await updateDoc(docRef, {
          quantity: newQuantity,
        });
      } else {
        await addDoc(collection(db, "items"), {
          name: newInput.name.trim(),
          quantity: newInput.quantity,
          date: newInput.date,
        });
      }
      setNewInput({ name: "", quantity: 0, date: new Date() });
      router.push("/");
    }
  };

  return (
    <div>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Add Item
      </Typography>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          <form>
            <TextField
              label="Item Name"
              type="text"
              value={newInput.name}
              onChange={(e) =>
                setNewInput({ ...newInput, name: e.target.value })
              }
            />
            <TextField
              label="Quantity"
              type="number"
              value={newInput.quantity}
              onChange={(e) =>
                setNewInput({ ...newInput, quantity: e.target.value })
              }
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Expiration Date"
              type="date"
              value={newInput.date}
              onChange={(e) =>
                setNewInput({ ...newInput, date: e.target.value })
              }
            />
            <Button variant="contained" type="submit" onClick={addItem}>
              Add
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default page;
