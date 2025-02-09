"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items"); // Adjust this URL to match your API route
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Remove the deleted item from the state
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading items...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{item.name}</h2>
            <div>
              <h3>Type: {item.type}</h3>
              <h3>Price: ${item.price}</h3>
              <h3>Image: {item.image}</h3>
              <h3>Available: {item.available ? "Yes" : "No"}</h3>
            </div>
            <div className="flex gap-2">
              <button
                className="text-red-400"
                onClick={() => handleDelete(item._id)}
              >
                <HiOutlineTrash size={24} />
              </button>
              <Link href={`/editItem/${item._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
