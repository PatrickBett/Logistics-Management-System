import { createContext, useState, useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingDriver, setEditingDriver] = useState(null);

  const [trucks, setTrucks] = useState([]);

  // fetch trucks
  const fetchTrucks = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/api/trucks/");
      setTrucks(res.data);
      console.log("This are trucks", res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTrucks();
  }, []);
  //fetch Drivers

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("api/drivers/");
      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDrivers();
  }, []);
  //editDriver
  const handleEdit = async (updatedDriverData) => {
    setIsLoading(true);
    try {
      const res = await api.put(
        `api/drivers/${updatedDriverData.id}/`,
        updatedDriverData,
      );
      // res.data is the updated driver object returned from backend
      const updatedDriver = res.data;

      // Update drivers state
      setDrivers((prev) =>
        prev.map((d) => (d.id === updatedDriver.id ? updatedDriver : d)),
      );

      toast.success("Edit Successfull!!!");
      // Close modal programmatically
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddDriver = (newDriver) => {
    setDrivers((prev) => [...prev, newDriver]); // ✅ spread
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await api.delete(`api/drivers/${id}/`);
      setDrivers((prev) => prev.filter((d) => d.id !== id));
      toast.error("Deleted successfully");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        drivers,
        isLoading,
        setIsLoading,
        isEditingDriver,
        setEditingDriver,
        fetchDrivers,
        setDrivers,
        handleEdit,
        handleAddDriver,
        handleDelete,
        trucks,
        setTrucks,
        fetchTrucks,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
