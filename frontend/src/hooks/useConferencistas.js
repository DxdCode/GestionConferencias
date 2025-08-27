import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useFetch from "./useFetch";

export default function useConferencistas() {
    const [fetchDataBackend] = useFetch();
    const [conferencistas, setConferencistas] = useState([]);
    const[loading, setLoading] = useState(false)
}

const token = JSON.parese(localStorage.getItem("auth-token"))?.state?.token || "";
const headers = {Authorization: `Bearer ${token}`,"Content-Type": "application/json"};

// Obtener Conferencistas
const cargarConferencistas = async () => {
    setLoading(true);
    try{
        
    }