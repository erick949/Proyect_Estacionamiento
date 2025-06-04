import { useState, useEffect, useMemo } from "react"
import { categories } from "./data/categories"

// Tipos
interface Activity {
  category: string
  name: string
  calorias: string
}

interface FormProps {
  onAddActivity: (activity: Activity) => void
}

interface ActivityListProps {
  activities: Activity[]
  onDeleteActivity?: (index: number) => void
}

function Form({ onAddActivity }: FormProps) {
  const [activity, setActivity] = useState<Activity>({
    category: '',
    name: '',
    calorias: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setActivity(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!activity.category || !activity.name || !activity.calorias) {
      alert("Por favor, completa todos los campos")
      return
    }
    onAddActivity(activity)
    setActivity({ category: '', name: '', calorias: '' })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 shadow p-10 rounded-lg bg-white"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold text-gray-700">Categoría:</label>
        <select
          id="category"
          name="category"
          className="border border-slate-300 p-2 rounded-lg w-full"
          value={activity.category}
          onChange={handleChange}
        >
          <option value="">-- Selecciona --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <label htmlFor="name" className="font-bold text-gray-700">Actividad:</label>
        <input
          id="name"
          name="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Ejercicio..."
          value={activity.name}
          onChange={handleChange}
        />

        <input
          id="calorias"
          name="calorias"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías. Ej. 300"
          value={activity.calorias}
          onChange={handleChange}
        />

        <input
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer"
          value="Guardar"
        />
      </div>
    </form>
  )
}

function ActivityList({ activities, onDeleteActivity }: ActivityListProps) {
  // Función para obtener nombre de categoría a partir del id
  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId)
    return cat ? cat.name : 'Sin categoría'
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow space-y-6 text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Actividades guardadas</h2>

      {activities.length === 0 ? (
        <p className="text-center text-gray-300">No hay actividades registradas</p>
      ) : (
        activities.map((activity, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-700 p-5 rounded-md shadow"
          >
            <div className="space-y-1 relative">
              <p
                className={`absolute -top-6 -left-8 px-4 py-1 text-white uppercase font-bold ${
                  activity.category === '1' ? 'bg-lime-500' : 'bg-orange-500'
                }`}
              >
                {getCategoryName(activity.category)}
              </p>
              <p className="text-xl font-semibold">{activity.name}</p>
              <p className="text-lg font-bold text-lime-400">{activity.calorias} cal</p>
            </div>

            {onDeleteActivity && (
              <button
                onClick={() => onDeleteActivity(i)}
                aria-label={`Eliminar actividad ${activity.name}`}
                className="text-red-600 hover:text-red-400 font-bold"
              >
                Eliminar
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

function App() {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const stored = localStorage.getItem("activities")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities))
  }, [activities])

  const handleAddActivity = (activity: Activity) => {
    setActivities(prev => [...prev, activity])
  }

  const handleDeleteActivity = (index: number) => {
    setActivities(prev => prev.filter((_, i) => i !== index))
  }

  const canRestartApp = useMemo(() => activities.length > 0, [activities])

  const handleRestart = () => {
    setActivities([])
  }

  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorías
          </h1>

          <button
            className="bg-gray-700 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp}
            onClick={handleRestart}
          >
            REINICIAR APP
          </button>
        </div>
      </header>

      <section className="bg-gray-700 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form onAddActivity={handleAddActivity} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={activities} onDeleteActivity={handleDeleteActivity} />
      </section>
    </>
  )
}

export default App
