const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

// @desc    Crear un nuevo autor
// @route   POST /api/autores
// @access  Privado
const crearAutor = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, nacionalidad, biografia } = req.body;
    
    const autor = await Autor.create({
      nombre,
      fechaNacimiento,
      nacionalidad,
      biografia
    });
    
    res.status(201).json(autor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el autor' });
  }
};

// @desc    Obtener todos los autores
// @route   GET /api/autores
// @access  Público
const obtenerAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los autores' });
  }
};

// @desc    Obtener un autor por ID
// @route   GET /api/autores/:id
// @access  Público
const obtenerAutorPorId = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    
    res.json(autor);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    
    res.status(500).json({ mensaje: 'Error al obtener el autor' });
  }
};

// @desc    Actualizar un autor
// @route   PUT /api/autores/:id
// @access  Privado
const actualizarAutor = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, nacionalidad, biografia } = req.body;
    
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    
    autor.nombre = nombre || autor.nombre;
    autor.fechaNacimiento = fechaNacimiento || autor.fechaNacimiento;
    autor.nacionalidad = nacionalidad || autor.nacionalidad;
    autor.biografia = biografia || autor.biografia;
    
    const autorActualizado = await autor.save();
    
    res.json(autorActualizado);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    
    res.status(500).json({ mensaje: 'Error al actualizar el autor' });
  }
};

// @desc    Eliminar un autor
// @route   DELETE /api/autores/:id
// @access  Privado
const eliminarAutor = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    
    if (!autor) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    
    // Eliminar también los libros asociados al autor
    await Libro.deleteMany({ AutorId: autor._id });
    
    await autor.deleteOne();
    
    res.json({ mensaje: 'Autor eliminado correctamente' });
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    
    res.status(500).json({ mensaje: 'Error al eliminar el autor' });
  }
};

// @desc    Obtener todos los libros de un autor
// @route   GET /api/autores/:autorId/libros
// @access  Público
const obtenerLibrosPorAutor = async (req, res) => {
  try {
    const libros = await Libro.find({ AutorId: req.params.autorId });
    res.json(libros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los libros del autor' });
  }
};

module.exports = {
  crearAutor,
  obtenerAutores,
  obtenerAutorPorId,
  actualizarAutor,
  eliminarAutor,
  obtenerLibrosPorAutor
};