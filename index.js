const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/cancion', async (req, res) => {
    try {
      const { titulo, artista, tono } = req.body;
      const insertQuery = 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)';
      await db.query(insertQuery, [titulo, artista, tono]);
      res.status(201).send('Canción insertada correctamente');
    } catch (error) {
      console.error('Error al insertar la canción:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

app.get('/canciones', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM canciones');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las canciones:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/cancion/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, artista, tono } = req.body;
      const updateQuery = 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4';
      await db.query(updateQuery, [titulo, artista, tono, id]);
      res.status(200).send('Canción actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la canción:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

app.delete('/cancion', async (req, res) => {
    try {
      const { id } = req.query;
      const deleteQuery = 'DELETE FROM canciones WHERE id = $1';
      await db.query(deleteQuery, [id]);
      res.status(200).send('Canción eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
      res.status(500).send('Error interno del servidor');
    }
  });


app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
