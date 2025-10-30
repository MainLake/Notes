import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

// Define la URL base de la API
const API_URL = 'http://localhost:3000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde la API al iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
        alert('No se pudieron cargar las tareas. ¿El servidor backend está funcionando?');
      }
    };
    fetchTasks();
  }, []);

  // Añadir una nueva tarea
  const handleAddTask = async (title, description) => {
    try {
      const response = await axios.post(API_URL, { title, description });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error al añadir la tarea:", error);
      alert('Error al añadir la tarea.');
    }
  };

  // Marcar una tarea como completada/pendiente
  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed });
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert('Error al actualizar la tarea.');
    }
  };

  // Eliminar una tarea
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert('Error al eliminar la tarea.');
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="container">
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;