import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchTotalItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    let totalQuantity = 0;
    let itemsArray = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      itemsArray.push(data);
      totalQuantity += Number(data.quantity || 0);
    });

    return {
      totalItems: itemsArray.length,
      totalQuantities: totalQuantity,
    };
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return { totalItems: 0, totalQuantities: 0 };
  }
};

export const formatDate = (date) => {
  // Convert date to yyyy-MM-dd format
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};