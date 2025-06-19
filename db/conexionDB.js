import { MongoClient } from "mongodb";

// URL de conexión a MongoDB
const url = "mongodb+srv://alantm1103:UyrU0sNEPPPSJmzD@cluster0.qknfffg.mongodb.net/";
const baseDeDatos = "FesAragon";
const coleccion = "Peliculas";

// Función para conectar a la base de datos y obtener la colección
export default async function conectarAlaDbAsync() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(baseDeDatos);
  const dbCollection = db.collection(coleccion);
  console.log("Instancia de la base de datos correcta")
  return dbCollection;
}

// Obtener una película por ID
export async function obtenerPorId(id) {
  const dbCollection = await conectarAlaDbAsync();
  const pelicula = await dbCollection.findOne({ id: Number(id) });
  return pelicula;
}

// Obtener todas las películas
export async function obtenerTodos() {
  const dbCollection = await conectarAlaDbAsync();
  const lista = await dbCollection.find({}).toArray();
  return lista;
}

// Agregar una nueva película con autoincremento simulado
export async function agregar(pelicula) {
  const dbCollection = await conectarAlaDbAsync();
  const totalDocumentos = await dbCollection.countDocuments();
  const id = totalDocumentos + 1;
  pelicula.id = id;
  const resultado = await dbCollection.insertOne(pelicula);
  console.log("Insertado:", resultado.insertedId);
  return id;
}
