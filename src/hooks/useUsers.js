import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../api/galleryApi";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchUsers();
      setUsers(response?.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return {
    users,
    loading,
    error,
    refreshUsers,
  };
};


