import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useDebounce from "../deBounce.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Searchbar = ({ setSearchResults }) => {
  const [quer, setQuer] = useState("");
  const debounceSearchTerm = useDebounce(quer, 500);

  const handleChange = (e) => {
    setQuer(e.target.value);
  };

  useEffect(() => {
    if (debounceSearchTerm) {
      const fetchItems = async () => {
        try {
          const q = query(
            collection(db, "items"),
            where("name", ">=", debounceSearchTerm),
            where("name", "<=", debounceSearchTerm + "\uf8ff")
          );
          const querySnapshot = await getDocs(q);
          let newArr = [];
          querySnapshot.forEach((doc) => {
            newArr.push({ ...doc.data(), id: doc.id });
          });
          setSearchResults(newArr);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      };
      fetchItems();
    } else {
      setSearchResults([]);
    }
  }, [debounceSearchTerm, setSearchResults]);
  return (
    <div>
      <TextField value={quer} label="Search Pantry" onChange={handleChange} />
    </div>
  );
};

export default Searchbar;
