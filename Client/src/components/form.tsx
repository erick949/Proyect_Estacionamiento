import { useState } from "react"
import { categories } from "../data/categories"

export default function Form() {
    const [activity, setActivity] = useState({
        category: '',
        name: '',
        calorias: ''
    })

    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setActivity({
    //         ...activity,
    //         [name]: value
    //     })
    // }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setActivity({
        ...activity,
        [name]: value
    })
    }


    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select
                    id="category"
                    name="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    <option value="">-- Selecciona --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />

                <input
                    id="calorias"
                    name="calorias"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorías. Ej. 300 o 500"
                    value={activity.calorias}
                    onChange={handleChange}
                />

                <input
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-lg cursor-pointer"
                    value="Guardar comida o Guardar ejercicio"
                />
            </div>
        </form>
    )
}
