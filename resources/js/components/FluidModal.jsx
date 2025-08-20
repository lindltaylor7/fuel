import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../axiosConfig";

function FluidModal({ isOpen, onClose, title, vehicles }) {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = handleSubmit((data) => {
        var vehicleSelected = vehicles.find((v) => v.id == data.vehicle);

        const fd = new FormData();

        fd.append("vehicle_id", vehicleSelected.id);
        fd.append("compressor", data.compressor);
        fd.append("refrigerant", data.refrigerant);
        fd.append("engine", data.engine);
        fd.append("hydraulic", data.hydraulic);

        axiosInstance
            .post("/fluids", fd)
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
                    <h3 className="text-lg font-bold">
                        Nuevo registro de Fluidos
                    </h3>
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
                            <label htmlFor="">Refrigerante</label>
                            <input
                                {...register("refrigerant")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Compresor</label>
                            <input
                                {...register("compressor")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Motor</label>
                            <input
                                {...register("engine")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Hidraulico</label>
                            <input
                                {...register("hydraulic")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
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

export default FluidModal;
