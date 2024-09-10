import { useState, useEffect } from 'react';
import { fetchInventory, updateStock } from '../api/inventoryApi';

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getInventory = async () => {
    setLoading(true);
    try {
      const data = await fetchInventory();
      setInventory(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const updateInventoryItem = async (itemId, newQuantity) => {
    try {
      await updateStock(itemId, newQuantity);
      setInventory(prevInventory =>
        prevInventory.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      setError('Failed to update inventory');
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return { inventory, loading, error, getInventory, updateInventoryItem };
};

export default useInventory;