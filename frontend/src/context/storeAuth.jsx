import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeAuth = create(
    persist(
        (set) => ({
            token: null,
            nombre: null,
            apellido: null,
            email: null,

            // Metodo para setear
            setToken: (token) => set({ token }),
            setNombre: (nombre) => set({ nombre }),
            setApellido: (apellido) => set({ apellido }),
            setEmail: (email) => set({ email }),

            // Metodo para limpiar individualmente
            clearToken: () => set({ token: null }),
            clearNombre: () => set({ nombre: null }),
            clearApellido: () => set({ apellido: null }),
            clearEmail: () => set({ email: null }),

            // Limpiar todo
            clearAll: () => set({ token: null, nombre: null, apellido: null, email: null }),
        }),
        {
            name: "auth-token",
        }
        
    )
    
);

export default storeAuth;
