import React, { useEffect, useState } from "react";
import axios from "axios";
import InsertModal from "../components/InsertModal";

function HomePage() {
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    return (
        <div className="px-3">
            <h1 className="text-4xl font-bold mt-4">Registro de Combustible</h1>

            <div className="w-full">
                <InsertModal isOpen={isModalOpen} onClose={closeModal} />
                <button
                    className="bg-blue-600 p-2 text-white rounded"
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
                            Combustible
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Agua
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Hora de agotamiento del combustible
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {vehicle.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2"></td>
                            <td className="border border-gray-300 px-4 py-2"></td>
                            <td className="border border-gray-300 px-4 py-2"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;
