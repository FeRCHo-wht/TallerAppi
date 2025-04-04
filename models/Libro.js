const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título del libro es obligatorio'],
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  fechaPublicacion: {
    type: Date
  },
  genero: {
    type: String,
    trim: true
  },
  AutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autor',
    required: [true, 'El autor del libro es obligatorio']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Libro', libroSchema);