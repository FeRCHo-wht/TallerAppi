const Libro = require('../models/Libro');
const Autor = require('../models/Autor');

// @desc    Crear un nuevo libro
// @route   POST /api/libros
// @access  Privado
const crearLibro = async (req, res) => {
  try {
    const { titulo, isbn, fechaPublicacion, genero, AutorId } = req.body;
    
    // Verificar si el autor existe
    const autorExiste = await Autor.findById(AutorId);
    
    if (!autorExiste) {
      return res.status(404).json({ mensaje: 'El autor no existe' });
    }
    
    const libro = await Libro.create({
      titulo,
      isbn,
      fechaPublicacion,
      genero,
      AutorId
    });
    
    res.status(201).json(libro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el libro' });
  }
};

// @desc    Obtener todos los libros
// @route   GET /api/libros
// @access  Público
const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate('AutorId', 'nombre nacionalidad');
    res.json(libros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los libros' });
  }
};

// @desc    Obtener un libro por ID
// @route   GET /api/libros/:id
// @access  Público
const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).populate('AutorId', 'nombre nacionalidad biografia');
    
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    
    res.json(libro);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};

// @desc    Actualizar un libro
// @route   PUT /api/libros/:id
// @access  Privado
const actualizarLibro = async (req, res) => {
  try {
    const { titulo, isbn, fechaPublicacion, genero, AutorId } = req.body;
    
    const libro = await Libro.findById(req.params.id);
    
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    
    // Si se proporciona un nuevo AutorId, verificar que exista
    if (AutorId && AutorId !== libro.AutorId.toString()) {
      const autorExiste = await Autor.findById(AutorId);
      
      if (!autorExiste) {
        return res.status(404).json({ mensaje: 'El autor no existe' });
      }
    }
    
    libro.titulo = titulo || libro.titulo;
    libro.isbn = isbn || libro.isbn;
    libro.fechaPublicacion = fechaPublicacion || libro.fechaPublicacion;
    libro.genero = genero || libro.genero;
    libro.AutorId = AutorId || libro.AutorId;
    
    const libroActualizado = await libro.save();
    
    res.json(libroActualizado);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
};

// @desc    Eliminar un libro
// @route   DELETE /api/libros/:id
// @access  Privado
const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    
    await libro.deleteOne();
    
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    
    res.status(500).json({ mensaje: 'Error al eliminar el libro' });
  }
};

// @desc    Crear un libro para un autor específico
// @route   POST /api/autores/:autorId/libros
// @access  Privado
const crearLibroPorAutor = async (req, res) => {
  try {
    const { titulo, isbn, fechaPublicacion, genero } = req.body;
    const autorId = req.params.autorId;
    
    // Verificar si el autor existe
    const autorExiste = await Autor.findById(autorId);
    
    if (!autorExiste) {
      return res.status(404).json({ mensaje: 'El autor no existe' });
    }
    
    const libro = await Libro.create({
      titulo,
      isbn,
      fechaPublicacion,
      genero,
      AutorId: autorId
    });
    
    res.status(201).json(libro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el libro' });
  }
};

// @desc    Obtener un libro específico de un autor específico
// @route   GET /api/autores/:autorId/libros/:libroId
// @access  Público
const obtenerLibroDeAutor = async (req, res) => {
  try {
    const { autorId, libroId } = req.params;
    
    const libro = await Libro.findOne({
      _id: libroId,
      AutorId: autorId
    }).populate('AutorId', 'nombre nacionalidad');
    
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado para este autor' });
    }
    
    res.json(libro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el libro' });
  }
};

// @desc    Actualizar un libro específico de un autor específico
// @route   PUT /api/autores/:autorId/libros/:libroId
// @access  Privado
const actualizarLibroDeAutor = async (req, res) => {
  try {
    const { autorId, libroId } = req.params;
    const { titulo, isbn, fechaPublicacion, genero } = req.body;
    
    const libro = await Libro.findOne({
      _id: libroId,
      AutorId: autorId
    });
    
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado para este autor' });
    }
    
    libro.titulo = titulo || libro.titulo;
    libro.isbn = isbn || libro.isbn;
    libro.fechaPublicacion = fechaPublicacion || libro.fechaPublicacion;
    libro.genero = genero || libro.genero;
    
    const libroActualizado = await libro.save();
    
    res.json(libroActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
};

// @desc    Eliminar un libro específico de un autor específico
// @route   DELETE /api/autores/:autorId/libros/:libroId
// @access  Privado
const eliminarLibroDeAutor = async (req, res) => {
  try {
    const { autorId, libroId } = req.params;
    
    const libro = await Libro.findOne({
      _id: libroId,
      AutorId: autorId
    });
    
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado para este autor' });
    }
    
    await libro.remove();
    
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el libro' });
  }
};

module.exports = {
  crearLibro,
  obtenerLibros,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro,
  crearLibroPorAutor,
  obtenerLibroDeAutor,
  actualizarLibroDeAutor,
  eliminarLibroDeAutor
};