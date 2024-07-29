"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Drawer, Button, List, ListItem } from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Menu</Button>

      <Drawer
        anchor="left"
        open={open} // useState controls opening
        onClose={handleClick} // closes when you click anywhere else on the page
      >
        <nav>
          <List>
            <ListItem>
              <Link href="/">Dashboard</Link>
            </ListItem>
            <ListItem>
              <Link href="/add-items">Add Items</Link>
            </ListItem>
            <List Item>
              <Link href="/pantry-list-items">Pantry List Items</Link>
            </List>
          </List>
        </nav>
      </Drawer>
    </div>
  );
};

export default Navbar;
