"use client";
import React, { useState, useEffect, Component } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Container,
} from "@mui/material";
import SearchBar from "../components/Searchbar.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { fetchTotalItems, formatDate } from "../utils/utils.js";

const PantryPage = () => {
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      let newArr = [];
      querySnapshot.forEach((doc) => {
        newArr.push({ ...doc.data(), id: doc.id });
      });
      calcTotal(newArr);
      setItems(newArr);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchTotalItems();
  }, []);

  const calcTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += Number(item.quantity || 0);
    });
    setTotalItems(items.length);
    setTotalQuantities(total);
  };
  const handleDelete = async (itemId) => {
    try {
      // Reference to the document
      const docRef = doc(db, "items", itemId);

      // Delete the document
      await deleteDoc(docRef);

      fetchItems();
      fetchTotalItems();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleAdd = async (itemId, currentQuantity) => {
    try {
      // Reference to the document
      const docRef = doc(db, "items", itemId);

      // Update the quantity by incrementing
      await updateDoc(docRef, {
        quantity: Number(currentQuantity || 0) + 1,
      });

      fetchItems();
      fetchTotalItems();
    } catch (error) {
      console.error("Error updating item quantity: ", error);
    }
  };

  const handleSub = async (itemId, currentQuantity) => {
    try {
      // Reference to the document
      const docRef = doc(db, "items", itemId);

      // Calculate new quantity
      const newQuantity = Number(currentQuantity || 0) - 1;

      if (newQuantity <= 0) {
        // Delete the document if the new quantity is 0 or less
        await deleteDoc(docRef);
      } else {
        // Update the document with the new quantity
        await updateDoc(docRef, {
          quantity: newQuantity,
        });
      }

      // Fetch items after updating or deleting
      fetchItems();
      fetchTotalItems();
    } catch (error) {
      console.error("Error updating item quantity: ", error);
    }
  };

  return (
    <>
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
          sx={{ border: "2px solid grey", display: "block" }}
        >
          Total Items
          <Typography variant="h1" sx={{ mb: 1 }}>
            {totalItems}
          </Typography>
        </Box>
        <Box
          height={100}
          width={200}
          mx={4}
          py={2}
          sx={{ border: "2px solid grey", display: "block" }}
        >
          Total Quantities
          <Typography variant="h1" sx={{ mb: 1 }}>
            {totalQuantities}
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        mt={4}
      >
        <SearchBar setSearchResults={setSearchResults} />
      </Box>
      <Table aria-label="basic table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Expiration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(searchResults.length > 0 ? searchResults : items).map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item.id, item.quantity)}
                    >
                      X
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleAdd(item.id, item.quantity)}
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleSub(item.id, item.quantity)}
                    >
                      -
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default PantryPage;
