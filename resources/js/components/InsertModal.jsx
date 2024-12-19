import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../axiosConfig";

function InsertModal({ isOpen, onClose, title, vehicles }) {
    const { register, handleSubmit, reset } = useForm();

    const [time, setTime] = useState(0);
    const [performance, setPerformance] = useState(0);

    const convertDecimalToTime = (decimal) => {
        const currentDate = new Date();
        const hours = Math.floor(decimal);
        const minutes = Math.floor((decimal - hours) * 60);
        const seconds = Math.floor(((decimal - hours) * 60 - minutes) * 60);

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate.toLocaleString();
    };

    const onSubmit = handleSubmit((data) => {
        var vehicleSelected = vehicles.find((v) => v.id == data.vehicle);

        var performance =
            ((Number(data.fuel) - 10) * Number(vehicleSelected.max_gallon)) /
            100 /
            Number(vehicleSelected.intake);

        setPerformance(performance.toFixed(2));

        var numberCalculated = Number(performance) + 7.5;

        var numberOnDate = convertDecimalToTime(numberCalculated);

        setTime(numberOnDate);

        const fd = new FormData();

        fd.append("vehicle_id", vehicleSelected.id);
        fd.append("fuel", data.fuel);
        fd.append("performance", performance);
        fd.append("date_estimated", numberOnDate);

        axiosInstance
            .post("/markings", fd)
            .then((result) => {
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (!isOpen) return null;
    return (
        <div
            id="modal"
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
                <div className="border-b p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Nuevo registro</h3>
                    <button
                        id="close-modal"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <form onSubmit={onSubmit}>
                        <div className="mt-2">
                            <label htmlFor="">Nombre del equipo</label>

                            <select
                                className="bg-zinc-300 p-2 w-full rounded"
                                {...register("vehicle")}
                            >
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.name} - Max Galón(
                                        {vehicle.max_gallon})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">
                                Cantidad de combustible disponible
                            </label>
                            <input
                                {...register("fuel")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">
                                Cantidad de agua disponible
                            </label>
                            <input
                                {...register("water")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Inicio de turno</label>
                            <p>7,5</p>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Rendimiento</label>
                            <p>{performance}</p>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">
                                Fecha y hora de agotamiento del combustible
                            </label>
                            <p>{time}</p>
                        </div>
                    </form>
                    {/* <p className="text-gray-600">
                        Este es el contenido del modal.
                    </p> */}
                </div>
                <div className="border-t p-4 flex justify-end">
                    <button
                        id="cancel"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        id="confirm"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={onSubmit}
                    >
                        Registrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InsertModal;
