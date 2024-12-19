import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
function VehicleModal({ isOpen, onClose, vehicles }) {
    const { register, handleSubmit, reset } = useForm();

    const [time, setTime] = useState(0);

    const convertDecimalToTime = (decimal) => {
        const currentDate = new Date();
        const hours = Math.floor(decimal);
        const minutes = Math.floor((decimal - hours) * 60);
        const seconds = Math.floor(((decimal - hours) * 60 - minutes) * 60);

        currentDate.setHours(hours, minutes, seconds, 0);

        return currentDate.toLocaleString();
    };

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        axios
            .post("/fuel/public/api/vehicles", data)
            .then((result) => {
                console.log("Vehicle created successfully");
                vehicles.push(data);
                reset();
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    if (!isOpen) return null;
    return (
        <div
            id="vehicle-modal"
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
                <div className="border-b p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Nuevos equipos</h3>
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

                            <input
                                {...register("name")}
                                type="text"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Max Galón</label>
                            <input
                                {...register("max_gallon")}
                                type="number"
                                className="bg-zinc-300 p-2 w-full rounded"
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="">Consumo gl/h</label>
                            <input
                                {...register("intake")}
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
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VehicleModal;
