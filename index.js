const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Usar variable de entorno
    pass: process.env.EMAIL_PASS   // Usar variable de entorno
  }
});

app.post('/reset_password', (req, res) => {
  const { nombre, app, clave, email } = req.body;

  console.log('Datos recibidos:', { nombre, app, clave, email });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: 'Nueva contraseña para ' + app,
    text: `Hola ${nombre},\n\nTu nueva contraseña es: ${clave}\n\nSaludos,\nEl equipo de ${app}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Correo enviado:', info.response);
    res.status(200).send('Correo enviado: ' + info.response);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});