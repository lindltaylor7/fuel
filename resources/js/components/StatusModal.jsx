import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../axiosConfig";

function FluidModal({ isOpen, onClose, title, vehicles }) {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = handleSubmit((data) => {
        var vehicleSelected = vehicles.find((v) => v.id == data.vehicle);

        const fd = new FormData();

        fd.append("vehicle_id", vehicleSelected.id);
        fd.append("fuel", data.fuel);
        fd.append("water", data.water);
        fd.append("cleaning", data.cleaning);
        fd.append("comments", data.comments);

        axiosInstance
            .post("/statuses", fd)
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
                        Nuevo registro de Status
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
                                        {vehicle.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Combustible</label>
                            <input
                                {...register("fuel")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Agua</label>
                            <input
                                {...register("water")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Limpieza</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    {...register("cleaning")}
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Comentarios</label>
                            <input
                                {...register("comments")}
                                type="text"
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
