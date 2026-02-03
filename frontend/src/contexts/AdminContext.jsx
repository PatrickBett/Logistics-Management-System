import { createContext, useState, useEffect, useMemo } from "react";
import api from "../api";
import { toast } from "react-toastify";
import EditParty from "../pages/Modals/EditParty";
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingDriver, setEditingDriver] = useState(null);
  const [isEditingTruck, setEditingTruck] = useState(null);
  const [isEditingParty, setEditingParty] = useState(null);
  const [isEditingJourney, setEditingJourney] = useState(null);
  const [parties, setParties] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [selectedStatus, setselectedStatus] = useState("All");

  //fetch parties
  const fetchParties = async () => {
    try {
      const res = await api.get("api/parties/");
      setParties(res.data);

      console.log("Parties", res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   fetchParties();
  // }, []);
  //delete journey
  const handleDeleteJourney = async (id) => {
    try {
      const res = await api.delete(`api/journeys/${id}/`);
      setJourneys((prev) => prev.filter((j) => j.id !== id));
      toast.success("Driver Deleted Successfully");
    } catch (e) {
      console.log(e);
      toast.error("Error Deleting Driver");
    }
  };
  // delete party
  const handleDeleteParty = async (id) => {
    try {
      const res = await api.delete(`api/parties/${id}/`);
      setParties((prev) => prev.filter((p) => p.id !== id));
      toast.success("Party Deleted successfully");
    } catch (e) {
      console.log(e);
    }
  };
  //delete journey
  const handleDeleteTruck = async (id) => {
    try {
      const res = await api.delete(`api/trucks/${id}/`);
      setTrucks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Truck Deleted Successfully");
    } catch (e) {
      console.log(e);
      toast.error("Error Deleting Truck");
    }
  };
  //fetch Journeys
  const fetchJourneys = async () => {
    try {
      const res = await api.get("api/journeys/");
      setJourneys(res.data);
      console.log("Journies", res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   fetchJourneys();
  // }, []);

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
  // useEffect(() => {
  //   fetchTrucks();
  // }, []);
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
  // useEffect(() => {
  //   fetchDrivers();
  // }, []);
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
  //deleting driver

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await api.delete(`api/drivers/${id}/`);
      setDrivers((prev) => prev.filter((d) => d.id !== id));
      toast.success("Deleted successfully");
    } catch (e) {
      console.log(e);
      toast.error("Error deleting party");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchDrivers();
      fetchTrucks();
      fetchJourneys();
      fetchParties();
    }
  }, [isAuthenticated]);

  //Edit Truck
  const handleEditTruck = async (updatedtruckdata) => {
    try {
      const res = await api.put(
        `api/trucks/${updatedtruckdata.id}/`,
        updatedtruckdata,
      );
      const updatedtruck = res.data;
      // Update trucks state
      setTrucks((prev) =>
        prev.map((t) => (t.id === updatedtruck.id ? updatedtruck : t)),
      );
      toast.success("Editing Successfull");
    } catch (e) {
      console.log(e);
      toast.error("Error Editing Truck");
    }
  };

  // Edit Party
  const handleEditParty = async (updatedpartydata) => {
    try {
      const res = await api.put(
        `api/parties/${updatedpartydata.id}/`,
        updatedpartydata,
      );
      const updatedparty = res.data;
      setParties((prev) =>
        prev.map((p) => (p.id === updatedparty.id ? updatedparty : p)),
      );
      toast.success("Editing Successfull");
    } catch (e) {
      console.log(e);
      toast.error("Error Editing Party");
    }
  };
  // edit journey
  const handleEditJourney = async (updatedJourneyData) => {
    console.log("Updated Journey Data:", updatedJourneyData);
    try {
      const res = await api.put(
        `api/journeys/${updatedJourneyData.id}/`,
        updatedJourneyData,
      );
      const updatedJourney = res.data;
      fetchDrivers(); // Refresh drivers to update their trip counts
      console.log("Updated Journey:", updatedJourney);
      setJourneys((prev) =>
        prev.map((j) => (j.id === updatedJourney.id ? updatedJourney : j)),
      );
      toast.success("Editing Successfull");
    } catch (e) {
      toast.error("Error Editing Journey");
      console.log("This is error", e);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  //calculate total revenue in a company using reduce
  const totalrevenue = useMemo(() => {
    const totalrevenue = parties.reduce((total, party) => {
      return total + Number(party.price || 0);
    }, 0);
    return totalrevenue;
  }, [parties]);

  //calculate total weight transported of a party using reduce
  const totalweighttransported = useMemo(() => {
    const totalweighttransported = journeys.reduce((total, journey) => {
      return total + journey.weight || 0;
    }, 0);
    return totalweighttransported;
  }, [journeys]);
  // filter drivers by status
  const filtereddriverbystatus = (status) => {
    setselectedStatus(status);
    if (status === "All") {
      setselectedStatus(drivers);
    } else {
      const filtered = drivers.filter((driver) => driver.status === status);
      setselectedStatus(filtered);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
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
        journeys,
        setJourneys,
        parties,
        setParties,
        handleDeleteParty,
        handleDeleteJourney,
        handleDeleteTruck,
        isEditingTruck,
        setEditingTruck,
        handleEditTruck,
        isEditingParty,
        setEditingParty,
        handleEditParty,
        isEditingJourney,
        setEditingJourney,
        handleEditJourney,
        totalrevenue,
        totalweighttransported,
        selectedStatus,
        filtereddriverbystatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};;
