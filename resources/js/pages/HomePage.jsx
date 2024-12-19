import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import InsertModal from "../components/InsertModal";
import VehicleModal from "../components/VehicleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faTruck } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
    const [vehicles, setVehicles] = useState([]);
    const [markings, setMarkings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        getAllMarkings();
    };

    const openVehicleModal = () => setIsVehicleModalOpen(true);
    const closeVehicleModal = () => {
        setIsVehicleModalOpen(false);
        getAllVehicles();
    };

    const getAllVehicles = () => {
        axiosInstance
            .get("/vehicles")
            .then((result) => {
                setVehicles(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllMarkings = () => {
        axiosInstance
            .get("/markings")
            .then((result) => {
                setMarkings(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllVehicles();
        getAllMarkings();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showVehicleModal = () => {
        setIsVehicleModalOpen(true);
    };

    const deleteVehicle = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este equipo?")) {
            axiosInstance
                .delete(`/vehicles/${id}`)
                .then((result) => {
                    setVehicles(vehicles.filter((v) => v.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const deleteMarking = (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta marcación?")) {
            axiosInstance
                .delete(`/markings/${id}`)
                .then((result) => {
                    setMarkings(markings.filter((m) => m.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="px-3">
            <h1 className="text-4xl font-bold mt-4">Registro de Combustible</h1>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <div className="w-full mt-3">
                        <button
                            className="bg-blue-600 p-2  text-white rounded"
                            onClick={showVehicleModal}
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Nuevo equipo
                        </button>
                    </div>
                    <div className="w-[50%]">
                        <h4 className="text-2xl font-semibold">Equipos</h4>
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
                                    <th className="border border-gray-300 px-4 py-2">
                                        Opciones
                                    </th>
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
                                                className="bg-red-500 text-white rounded p-2"
                                                onClick={() =>
                                                    deleteVehicle(vehicle.id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="px-1"
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <button
                        className="bg-blue-600 p-2 mx-1 text-white rounded"
                        onClick={showModal}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Crear nuevo registro
                    </button>
                    <div className="w-full">
                        <h4 className="text-2xl font-semibold">Marcaciones</h4>
                        <div className="container mx-auto p-4">
                            <h1 className="text-2xl font-bold mb-4">
                                Listado de Marcaciones
                            </h1>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">
                                                ID del Vehículo
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2">
                                                Combustible
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2">
                                                Rendimiento
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2">
                                                Fecha Estimada
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2">
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {markings.map((marking) => (
                                            <tr
                                                key={marking.id}
                                                className="hover:bg-gray-100"
                                            >
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {marking.vehicle_id}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {marking.fuel}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {marking.performance}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {marking.date_estimated}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={() =>
                                                            deleteMarking(
                                                                marking.id
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="px-1"
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                <div className="w-1/2 p-4"></div>
            </div>

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
