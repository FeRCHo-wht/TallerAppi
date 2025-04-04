const express = require('express');
const router = express.Router();
const { 
  crearLibro, 
  obtenerLibros, 
  obtenerLibroPorId, 
  actualizarLibro, 
  eliminarLibro 
} = require('../controllers/libroController');
const { protegerRuta } = require('../middleware/auth');

/**
 * @swagger
 * /api/libros:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - AutorId
 *             properties:
 *               titulo:
 *                 type: string
 *               isbn:
 *                 type: string
 *               fechaPublicacion:
 *                 type: string
 *                 format: date
 *               genero:
 *                 type: string
 *               AutorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.post('/', protegerRuta, crearLibro);

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros
 */
router.get('/', obtenerLibros);

/**
 * @swagger
 * /api/libros/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del libro
 *       404:
 *         description: Libro no encontrado
 */
router.get('/:id', obtenerLibroPorId);

/**
 * @swagger
 * /api/libros/{id}:
 *   put:
 *     summary: Actualizar un libro existente
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               isbn:
 *                 type: string
 *               fechaPublicacion:
 *                 type: string
 *                 format: date
 *               genero:
 *                 type: string
 *               AutorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *       404:
 *         description: Libro o autor no encontrado
 */
router.put('/:id', protegerRuta, actualizarLibro);

/**
 * @swagger
 * /api/libros/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       404:
 *         description: Libro no encontrado
 */
router.delete('/:id', protegerRuta, eliminarLibro);

module.exports = router;