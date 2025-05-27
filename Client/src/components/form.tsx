
import { useState } from "react"
import { categories } from "../data/categories"

export default function Form(){

    const [activity, _setActivity] = useState({
        category:'',
        name:'',
        calorias:''})
    return (
    <form
        className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
            <label htmlFor="activity" className="font-bold">Categoria:</label>

            <select
                className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category" value={activity.category}>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
            </select>
                <label htmlFor="activity" className="font-bold">Actividad:</label>
                <input id="activity" type="text" className="border border-slate-300 p-2 rounded-lg" placeholder="Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta" value={activity.name}/>
                <input id="activity" type="text" className="border border-slate-300 p-2 rounded-lg" placeholder="Calorias. Ej. 300 o 500" value={activity.calorias}/>

            <input type="submit" className="bg-green-500 text-white p-2 rounded-lg cursor-pointer" value='Guardar comida o Guardar Ejercicio'/>
            </div>
    </form>

    )
}
