const express = require('express');
const router = express.Router();
const User = require('../model/User.js');
const { Op } = require('sequelize');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.render('index_user', { users });
});

// Formulario para crear un nuevo usuario
router.get('/new', (req, res) => {
    res.render('new');
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { fullname, username, password, role } = req.body;
    await User.create({ fullname, username, password, role });
    res.redirect('/users');
});

// Formulario para editar un usuario
router.get('/:id/edit', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.render('edit', { user });
});

// Actualizar un usuario
router.post('/:id', async (req, res) => {
    const { fullname, username, password, role } = req.body;
    await User.update({ fullname, username, password, role }, {
        where: { id: req.params.id }
    });
    res.redirect('/users');
});

// Eliminar un usuario
router.post('/:id/delete', async (req, res) => {
    await User.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/users');
});
// Buscar usuarios por nombre (GET /users/search)
router.get('/search', async (req, res) => {
  const { name } = req.query; // Acceda al parámetro de consulta de búsqueda

  try {
    const options = {
      where: {
        username: {
          [Op.like]: `%${name}%` // Búsqueda insensible a mayúsculas y minúsculas con el operador LIKE
        }
      }
    };

    const users = await User.findAll(options);
    // res.json(users)
    res.render('index_user', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al buscar usuarios'); // Maneje los errores con elegancia
  }
});

module.exports = router;