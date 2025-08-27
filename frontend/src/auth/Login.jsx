import { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonRegresar from './ButtonRegresar';
import { toast, ToastContainer } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import storeAuth from '../context/storeAuth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { fetchDataBackend } = useFetch();
    const { setToken, setNombre, setApellido, setEmail } = storeAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginUser = async (data) => {
        try {
            setLoading(true);
            const url = `${import.meta.env.VITE_URL_BACKEND}/login`;

            const response = await fetchDataBackend(url, {
                method: 'POST',
                body: data
            });

            if (response?.token) {
                setToken(response.token);
                setNombre(response.nombre);
                setApellido(response.apellido);
                setEmail(response.email);

                toast.success(response?.msg || "Login Correcto");
                navigate("/dashboard");
            } else {
                toast.error(response?.msg || "Error al iniciar sesión");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error en la conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-screen bg-base flex flex-col md:flex-row">
            <ToastContainer />

            {/* Contenedor del login */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 bg-gray-900 relative">
                <div className="flex flex-col items-center w-full max-w-md">
                    <ButtonRegresar />

                    {/* Card del login */}
                    <div className="w-full bg-gray-50 p-8 rounded-2xl shadow-lg relative z-10" >
                        <h2 className="text-3xl font-bold text-center mb-6 text-sec">
                            Iniciar Sesión
                        </h2>

                        <form onSubmit={handleSubmit(loginUser)} className="flex flex-col gap-4">
                            {/* Correo */}
                            <label className="flex flex-col text-sec">
                                Correo
                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70"
                                    {...register("email", { required: "El correo es obligatorio" })}
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-600 rounded">{errors.email.message}</span>
                                )}
                            </label>

                            {/* Contraseña */}
                            <label className="flex flex-col text-sec relative">
                                Contraseña
                                <div className="mt-1 relative flex items-center">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="********"
                                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-70 pr-10"
                                        {...register("password", { required: "La contraseña es obligatoria" })}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 cursor-pointer text-gray-500"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </span>
                                </div>
                                {errors.password && (
                                    <span className="text-sm text-red-600 rounded">{errors.password.message}</span>
                                )}
                            </label>

                            {/* Botón de enviar */}
                            <button
                                type="submit"
                                className="mt-4 cursor-pointer bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition transform shadow-md w-full"
                            >
                                <LogIn size={20} />
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </button>

                            <div className="text-center mt-4 text-sm text-sec">
                                ¿Aún no tienes una cuenta?{" "}
                                <Link
                                    to="/register"
                                    className="text-primary text-blue-700 font-semibold hover:underline"
                                >
                                    Regístrate aquí
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
