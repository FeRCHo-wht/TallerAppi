const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del autor es obligatorio'],
    trim: true
  },
  fechaNacimiento: {
    type: Date
  },
  nacionalidad: {
    type: String,
    trim: true
  },
  biografia: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para obtener los libros del autor
autorSchema.virtual('libros', {
  ref: 'Libro',
  localField: '_id',
  foreignField: 'AutorId'
});

module.exports = mongoose.model('Autor', autorSchema);