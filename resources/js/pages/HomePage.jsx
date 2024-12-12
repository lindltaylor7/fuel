import React, { useEffect, useState } from "react";
import axios from "axios";
import InsertModal from "../components/InsertModal";
import VehicleModal from "../components/VehicleModal";

function HomePage() {
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openVehicleModal = () => setIsVehicleModalOpen(true);
    const closeVehicleModal = () => setIsVehicleModalOpen(false);

    useEffect(() => {
        axios
            .get("/api/vehicles")
            .then((result) => {
                setVehicles(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showVehicleModal = () => {
        setIsVehicleModalOpen(true);
    };

    const deleteVehicle = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este equipo?")) {
            axios
                .delete(`/api/vehicles/${id}`)
                .then((result) => {
                    setVehicles(vehicles.filter((v) => v.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="px-3">
            <h1 className="text-4xl font-bold mt-4">Registro de Combustible</h1>

            <div className="w-full mt-3">
                <button
                    className="bg-blue-600 p-2  text-white rounded"
                    onClick={showVehicleModal}
                >
                    Nuevo equipo
                </button>

                <button
                    className="bg-blue-600 p-2 mx-1 text-white rounded"
                    onClick={showModal}
                >
                    Crear nuevo registro
                </button>
            </div>

            <table className="table-auto border-collapse border border-gray-300 w-full text-left mt-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">
                            Equipo
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Max Galon
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Consumo
                        </th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {vehicle.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {vehicle.max_gallon}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {vehicle.intake}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="bg-red-400 text-white rounded p-2"
                                    onClick={() => deleteVehicle(vehicle.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <InsertModal
                isOpen={isModalOpen}
                onClose={closeModal}
                vehicles={vehicles}
            />
            <VehicleModal
                isOpen={isVehicleModalOpen}
                onClose={closeVehicleModal}
                vehicles={vehicles}
            />
        </div>
    );
}

export default HomePage;
