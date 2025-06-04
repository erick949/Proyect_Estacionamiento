import server from './server';

// const PORT = parseInt(process.env.PORT || '3000', 10);

// server.listen(PORT, '0.0.0.0', () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

