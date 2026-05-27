import { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import React from "react";

interface User {
    id: String;
    email: String;
    role: String;
    firstName: String;
    lastName: String;
}

export const SessionContext = createContext<{
  session: User | null;
  setSession: React.Dispatch<React.SetStateAction<User | null>>;
}>({
    session: null,
    setSession: () => { },
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You must be logged in to access this page.");
      navigate("/login");
    }

    const meAPIUrl = "http://localhost:4000/api/v1/users/me";

    const fetchMe = async () => {
        try {
            const response = await fetch(meAPIUrl, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await response.json();
            setSession(data.user);
        }   catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("authToken");
            navigate("/login");
        }
    }

    if (token) {
      fetchMe();
    }
  }, [navigate]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider")
    } 
    return context;
}