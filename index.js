import express from "express";
import conectarAlaDbAsync, { obtenerTodos, obtenerPorId, agregar } from "./db/conexionDB.js";
import cors from "cors";
const app = express();
const PORT = 3001;

// Middleware para parsear body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res)=>{
    res.status(200).json({mensaje: "hola mundo"})
})

app.use(cors())
// Ruta: Obtener todas las películas
app.get('/api/peliculas', async (req, res) => {
  try {
    const peliculas = await obtenerTodos();
    res.status(200).json(peliculas);
  } catch (error) {
    console.error("Error al obtener películas:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Ruta: Obtener una película por ID
app.get('/api/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await obtenerPorId(req.params.id);
    if (!pelicula) {
      return res.status(404).json({ mensaje: "Película no encontrada con el id: " + req.params.id });
    }
    res.status(200).json(pelicula);
  } catch (error) {
    console.error("Error al buscar película:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Ruta: Agregar una nueva película
app.post('/api/peliculas', async (req, res) => {
  try {
    const pelicula = {
      titulo: req.body.titulo,
      visto: false,
      resumen: req.body.resumen
    };
    const id = await agregar(pelicula);
    pelicula.id = id;
    res.status(201).json(pelicula);
  } catch (error) {
    console.error("Error al agregar película:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  conectarAlaDbAsync();
});
