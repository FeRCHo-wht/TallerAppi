const express = require('express');
const router = express.Router();
const { 
  crearAutor, 
  obtenerAutores, 
  obtenerAutorPorId, 
  actualizarAutor, 
  eliminarAutor,
  obtenerLibrosPorAutor
} = require('../controllers/autorController');
const { 
  crearLibroPorAutor, 
  obtenerLibroDeAutor, 
  actualizarLibroDeAutor, 
  eliminarLibroDeAutor
} = require('../controllers/libroController');
const { protegerRuta } = require('../middleware/auth');

/**
 * @swagger
 * /api/autores:
 *   post:
 *     summary: Crear un nuevo autor
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               nacionalidad:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor creado exitosamente
 */
router.post('/', protegerRuta, crearAutor);

/**
 * @swagger
 * /api/autores:
 *   get:
 *     summary: Obtener todos los autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores
 */
router.get('/', obtenerAutores);

/**
 * @swagger
 * /api/autores/{id}:
 *   get:
 *     summary: Obtener un autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del autor
 *       404:
 *         description: Autor no encontrado
 */
router.get('/:id', obtenerAutorPorId);

/**
 * @swagger
 * /api/autores/{id}:
 *   put:
 *     summary: Actualizar un autor existente
 *     tags: [Autores]
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
 *               nombre:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *               nacionalidad:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autor actualizado exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.put('/:id', protegerRuta, actualizarAutor);

/**
 * @swagger
 * /api/autores/{id}:
 *   delete:
 *     summary: Eliminar un autor
 *     tags: [Autores]
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
 *         description: Autor eliminado exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.delete('/:id', protegerRuta, eliminarAutor);

/**
 * @swagger
 * /api/autores/{autorId}/libros:
 *   get:
 *     summary: Obtener todos los libros de un autor
 *     tags: [Autores, Libros]
 *     parameters:
 *       - in: path
 *         name: autorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de libros del autor
 */
router.get('/:autorId/libros', obtenerLibrosPorAutor);

/**
 * @swagger
 * /api/autores/{autorId}/libros:
 *   post:
 *     summary: Crear un libro para un autor específico
 *     tags: [Autores, Libros]/**
 * @swagger
 * /api/autores/{autorId}/libros:
 *   post:
 *     summary: Crear un libro para un autor específico
 *     tags: [Autores, Libros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: autorId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
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
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *       404:
 *         description: Autor no encontrado
 */
router.post('/:autorId/libros', protegerRuta, crearLibroPorAutor);

/**
 * @swagger
 * /api/autores/{autorId}/libros/{libroId}:
 *   get:
 *     summary: Obtener un libro específico de un autor
 *     tags: [Autores, Libros]
 *     parameters:
 *       - in: path
 *         name: autorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: libroId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del libro
 *       404:
 *         description: Libro no encontrado para este autor
 */
router.get('/:autorId/libros/:libroId', obtenerLibroDeAutor);

/**
 * @swagger
 * /api/autores/{autorId}/libros/{libroId}:
 *   put:
 *     summary: Actualizar un libro específico de un autor
 *     tags: [Autores, Libros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: autorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: libroId
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
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *       404:
 *         description: Libro no encontrado para este autor
 */
router.put('/:autorId/libros/:libroId', protegerRuta, actualizarLibroDeAutor);

/**
 * @swagger
 * /api/autores/{autorId}/libros/{libroId}:
 *   delete:
 *     summary: Eliminar un libro específico de un autor
 *     tags: [Autores, Libros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: autorId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: libroId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente
 *       404:
 *         description: Libro no encontrado para este autor
 */
router.delete('/:autorId/libros/:libroId', protegerRuta, eliminarLibroDeAutor);

module.exports = router;