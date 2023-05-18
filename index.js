const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const conectarDB = require('./public/bd/conexionMongoDB');
const Mesa = require('./public/bd/mesa');

// Conectar a base de datos
conectarDB();

// Analisar o corpo da solicitação HTTP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

//rotas css/img/js
app.get('/style.css', function(req, res) {
  res.set('Content-Type', 'text/css');
  res.sendFile(__dirname + '/public/views/style.css');
});

// Rotas views
app.get(['/', '/criarMesa'], (req, res) => {
  res.render('criarMesa');
});

app.get("/mesa", (req, res) => {
  res.render('mesa');
});


//query mesas
// Obter todas as mesas
app.get('/mesas', async (req, res) => {
  try {
    const mesas = await Mesa.find();
    const data = res.json(mesas);
    return data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener las mesas' });
  }
});


//Metodos POST
// Agregar un nuevo convidado
app.post('/criarMesa', async (req, res) => {
  const garcom = req.body.garcom
  const nMesa = req.body.nMesa

  console.log(garcom, nMesa)

  /*
  */

  try {
    // Crear una nueva instancia del modelo del convidado
    const novaMesa = new Mesa({garcom, nMesa});

    // Guardar el nuevo convidado en la base de datos
    await novaMesa.save();

    console.log(novaMesa)

    res.send(
      '<script>alert("Mesa criada corretamente"); window.location.href="/";</script>'
    );

  } catch (error) {
    console.error(error);
    res.send(
      '<script>alert("Erro ao criar a mesa"); window.location.href="/";</script>'
    );
  }
});


app.post('/verMesas', async (req, res) => {
  res.send(
    '<script>window.location.href="/mesa";</script>'
  );
})




// Inicio server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server aberto em porta ${port}`);
});
