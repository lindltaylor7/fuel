import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import InsertModal from "../components/InsertModal";
import VehicleModal from "../components/VehicleModal";
import FluidModal from "../components/FluidModal";
import StatusModal from "../components/StatusModal";
import { Button, Card, Badge } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPlus,
    faTruck,
    faGasPump,
    faGauge,
    faCalendarDays,
    faWater,
} from "@fortawesome/free-solid-svg-icons";
import { get, set } from "lodash";

function HomePage() {
    const [vehicles, setVehicles] = useState([]);
    const [markings, setMarkings] = useState([]);
    const [fluids, setFluids] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
    const [isFluidModalOpen, setIsFluidModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalopen] = useState(false);
    const [activeTab, setActiveTab] = useState("vehicles"); // Para el sistema de pestañas

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
    const openFluidModal = () => setIsFluidModalOpen(true);
    const closeFluidModal = () => {
        setIsFluidModalOpen(false);
        getAllFluids();
    };

    const openStatusModal = () => setIsStatusModalopen(true);
    const closeStatusModal = () => {
        setIsStatusModalopen(false);
        getAllStatuses();
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
                console.log("markings", result.data);
                setMarkings(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllFluids = () => {
        axiosInstance
            .get("/fluids")
            .then((result) => {
                console.log("fluids", result.data);
                setFluids(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllStatuses = () => {
        axiosInstance
            .get("/statuses")
            .then((result) => {
                setStatuses(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllVehicles();
        getAllMarkings();
        getAllFluids();
        getAllStatuses();
    }, []);

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

    const deleteFluid = (id) => {
        if (
            window.confirm("¿Estás seguro de eliminar este registro de fluido?")
        ) {
            axiosInstance
                .delete(`/fluids/${id}`)
                .then((result) => {
                    setFluids(fluids.filter((f) => f.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const deleteStatus = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este status?")) {
            axiosInstance
                .delete(`/statuses/${id}`)
                .then((result) => {
                    setStatuses(statuses.filter((s) => s.id !== id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // Función para formatear fechas
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
    };

    return (
        <div className="px-4 py-6 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Registro de Combustible
                </h1>
                <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button
                        gradientMonochrome="cyan"
                        onClick={openVehicleModal}
                    >
                        <FontAwesomeIcon icon={faTruck} className="mr-2" />
                        Nuevo Equipo
                    </Button>
                    <Button gradientMonochrome="lime" onClick={openModal}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Nuevo Registro
                    </Button>
                    <Button gradientMonochrome="lime" onClick={openFluidModal}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Nuevo Registro de Fluidos
                    </Button>
                    <Button gradientMonochrome="cyan" onClick={openStatusModal}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Nuevo Registro de Status
                    </Button>
                </div>
            </div>

            {/* Tabs para vista móvil */}
            <div className="block md:hidden mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`py-2 px-4 font-medium ${
                            activeTab === "vehicles"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("vehicles")}
                    >
                        Equipos
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${
                            activeTab === "markings"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("markings")}
                    >
                        Marcaciones
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${
                            activeTab === "fluids"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("fluids")}
                    >
                        Fluidos
                    </button>
                    <button
                        className={`py-2 px-4 font-medium ${
                            activeTab === "statuses"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("statuses")}
                    >
                        Status Combustible / Agua
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sección de Equipos */}
                <div
                    className={`${
                        activeTab === "vehicles" || !activeTab
                            ? "block"
                            : "hidden"
                    } md:block`}
                >
                    <Card className="rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Equipos Registrados
                            </h2>
                            <Badge color="gray" className="px-3 py-1">
                                Total: {vehicles.length}
                            </Badge>
                        </div>

                        {vehicles.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FontAwesomeIcon
                                    icon={faTruck}
                                    className="text-4xl mb-3 text-gray-300"
                                />
                                <p>No hay equipos registrados</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Equipo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Max Galon
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Consumo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-center"
                                            >
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map((vehicle) => (
                                            <tr
                                                key={vehicle.id}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {vehicle.name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {vehicle.max_gallon}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {vehicle.intake}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Button
                                                        size="xs"
                                                        color="failure"
                                                        onClick={() =>
                                                            deleteVehicle(
                                                                vehicle.id
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sección de Marcaciones */}
                <div
                    className={`${
                        activeTab === "markings" || !activeTab
                            ? "block"
                            : "hidden"
                    } md:block`}
                >
                    <Card className="rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Registros de Combustible
                            </h2>
                            <Badge color="gray" className="px-3 py-1">
                                Total: {markings.length}
                            </Badge>
                        </div>

                        {markings.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FontAwesomeIcon
                                    icon={faGasPump}
                                    className="text-4xl mb-3 text-gray-300"
                                />
                                <p>No hay registros de combustible</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Vehículo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Combustible
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Fecha Estimada
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-center"
                                            >
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {markings.map((marking) => (
                                            <tr
                                                key={marking.id}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {marking.vehicle?.name ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faGasPump}
                                                            className="text-blue-500 mr-2"
                                                        />
                                                        {marking.fuel}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCalendarDays
                                                            }
                                                            className="text-purple-500 mr-2"
                                                        />
                                                        {formatDate(
                                                            marking.date_estimated
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Button
                                                        size="xs"
                                                        color="failure"
                                                        onClick={() =>
                                                            deleteMarking(
                                                                marking.id
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
                {/* Sección de Fluidos */}
                <div
                    className={`${
                        activeTab === "fluids" || !activeTab
                            ? "block"
                            : "hidden"
                    } md:block`}
                >
                    <Card className="rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Registros de Fluidos
                            </h2>
                            <Badge color="gray" className="px-3 py-1">
                                Total: {fluids.length}
                            </Badge>
                        </div>

                        {fluids.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FontAwesomeIcon
                                    icon={faGasPump}
                                    className="text-4xl mb-3 text-gray-300"
                                />
                                <p>No hay registros de fluidos</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Vehículo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Refrigerante
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Compresor
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Motor
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Hidráulico
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-center"
                                            >
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fluids.map((fluid) => (
                                            <tr
                                                key={fluid.id}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {fluid.vehicle?.name ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faGasPump}
                                                            className="text-blue-500 mr-2"
                                                        />
                                                        {fluid.refrigerant}{" "}
                                                        {" % "}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faGauge}
                                                            className="text-green-500 mr-2"
                                                        />
                                                        {fluid.compressor}{" "}
                                                        {" % "}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faGauge}
                                                            className="text-purple-500 mr-2"
                                                        />
                                                        {fluid.engine} {" % "}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faWater}
                                                            className="text-purple-500 mr-2"
                                                        />
                                                        {fluid.hydraulic}{" "}
                                                        {" % "}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Button
                                                        size="xs"
                                                        color="failure"
                                                        onClick={() =>
                                                            deleteFluid(
                                                                fluid.id
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
                {/* Sección de Status Agua/Combustible */}
                <div
                    className={`${
                        activeTab === "statuses" || !activeTab
                            ? "block"
                            : "hidden"
                    } md:block`}
                >
                    <Card className="rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Registros de Status Agua/Combustible
                            </h2>
                            <Badge color="gray" className="px-3 py-1">
                                Total: {statuses.length}
                            </Badge>
                        </div>

                        {statuses.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FontAwesomeIcon
                                    icon={faGasPump}
                                    className="text-4xl mb-3 text-gray-300"
                                />
                                <p>No hay registros de status</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Vehículo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Combustible
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Agua
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Limpieza
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-center"
                                            >
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statuses.map((status) => (
                                            <tr
                                                key={status.id}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {status.vehicle?.name ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faGasPump}
                                                            className="text-blue-500 mr-2"
                                                        />
                                                        {status.fuel} {" % "}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={faGauge}
                                                            className="text-green-500 mr-2"
                                                        />
                                                        {status.water} {" % "}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCalendarDays
                                                            }
                                                            className="text-purple-500 mr-2"
                                                        />
                                                        {status.shift == 1
                                                            ? "Noche"
                                                            : "Dia"}{" "}
                                                        - {status.comments}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Button
                                                        size="xs"
                                                        color="failure"
                                                        onClick={() =>
                                                            deleteStatus(
                                                                status.id
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>
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
            <FluidModal
                isOpen={isFluidModalOpen}
                onClose={closeFluidModal}
                vehicles={vehicles}
            />
            <StatusModal
                isOpen={isStatusModalOpen}
                onClose={closeStatusModal}
                vehicles={vehicles}
            />
        </div>
    );
}

export default HomePage;
