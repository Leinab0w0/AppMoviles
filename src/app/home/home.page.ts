import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';
import { Haptics } from '@capacitor/haptics';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home', // Selector del componente
  templateUrl: 'home.page.html', // Archivo de plantilla HTML
  styleUrls: ['home.page.scss'], // Archivo de estilos SCSS
})
export class HomePage {
  icono = "oscuro"; // Almacena el tema actual (claro/oscuro)
  email: string = ''; // Correo electrónico para la recuperación de contraseña
  isModalOpen: boolean = false; // Controla si el modal está abierto o cerrado

  constructor(private router: Router, private alert: AlertController, private anim: AnimationController, private http: HttpClient) { }

  irARecuperarContrasena() {
    this.router.navigate(['/resspass']); // Redirige a la página de recuperación de contraseña
  }

  registrarUsuario() {
    // Redirige a la página de registro de usuario
    this.router.navigate(['/registro-usuarios']);
  }

  ngOnInit() {
    // Se ejecuta al inicializar el componente, llama a la función de animación
    this.animarLogo();
  }


  animarLogo() {
    // Crea y reproduce una animación para el logo
    this.anim.create()
      .addElement(document.querySelector("#logo")!) // Selecciona el elemento del logo
      .duration(1500) // Duración de la animación
      .iterations(Infinity) // Repite indefinidamente
      .direction("normal") // Dirección normal de la animación
      .fromTo("color", "white", "cornflowerblue") // Cambia el color de blanco a azul
      .fromTo("transform", "scale(2.5)", "scale(0)") // Cambia la escala de 2 a 0
      .play(); // Reproduce la animación
  }

  cambiarTema() {
    // Cambia entre el tema claro y oscuro
    if (this.icono === "oscuro") {
      // Configuraciones para el tema claro
      document.documentElement.style.setProperty("--fondo", "#373737");
      document.documentElement.style.setProperty("--textos", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#171844");
      document.documentElement.style.setProperty("--background-image", "url('/assets/fondonodonegro.jpg')");
      document.documentElement.style.setProperty("--fondo-input", "#d7a995");
      document.documentElement.style.setProperty("--icono-tema", "#ffffff" );
      document.documentElement.style.setProperty("--recuperacion", "#d7f3f4" );
      this.icono = "claro"; // Actualiza el estado del icono
      localStorage.setItem('theme', 'claro'); // Guarda la preferencia en localStorage
    } else {
      // Configuraciones para el tema oscuro
      document.documentElement.style.setProperty("--fondo", "#454E5F");
      document.documentElement.style.setProperty("--fondo-input", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#53C5F2");
      document.documentElement.style.setProperty("--textos", "#000000");
      document.documentElement.style.setProperty("--background-image", "url('/assets/clarof.avif')");
      document.documentElement.style.setProperty("--icono-tema", "#000000" );
      document.documentElement.style.setProperty("--recuperacion", "#d7f3f4" );
      this.icono = "oscuro"; // Actualiza el estado del icono
      localStorage.setItem('theme', 'oscuro'); // Guarda la preferencia en localStorage
    }
  }

  async iniciarSesion() {
    // Simulación de credenciales para el inicio de sesión


   // Obtiene los valores ingresados por el usuario
  const usuario = (document.getElementById('user') as HTMLInputElement).value;
  const contrasena = (document.getElementById('pass') as HTMLInputElement).value;

  // Obtiene los usuarios guardados en LocalStorage
  let usuariosGuardados = localStorage.getItem('usuarios');
  let usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

  // Busca si el usuario ingresado existe y si la contraseña coincide
  const usuarioEncontrado = usuarios.find((user: any) =>
    user.nombreUsuario === usuario && user.contrasena === contrasena
  );

  if (usuarioEncontrado) {
    console.log('Inicio de sesión exitoso');
    localStorage.setItem("user", JSON.stringify(usuarioEncontrado))
    this.router.navigate(['/alumno']); // Navega a la página de alumno
  } else {
    console.log('Usuario y contraseña no coinciden');
    await this.presentAlert(); // Muestra alerta de error
  }
}

  async presentAlert() {
    // Crea y presenta una alerta de error
    const alert = await this.alert.create({
      header: 'Error', // Título de la alerta
      subHeader: 'Credenciales incorrectas', // Subtítulo
      message: 'El usuario y la contraseña no coinciden. Por favor, inténtalo de nuevo.', // Mensaje de error
      buttons: ['OK'] // Botones de la alerta
    });

    await alert.present(); // Presenta la alerta
  }

  bounceButton() {
    // Aplica una animación de rebote al botón de inicio de sesión
    const button = document.getElementById('login-button');

    if (button !== null) {
      const animation = createAnimation()
        .addElement(button) // Selecciona el botón
        .duration(500) // Duración de la animación
        .keyframes([
          { offset: 0, transform: 'translateY(0)' },
          { offset: 0.5, transform: 'translateY(-15px)' },
          { offset: 1, transform: 'translateY(0)' }
        ]);

      animation.play(); // Reproduce la animación
    } else {
      console.error('El botón con id "login-button" no se encontró.'); // Manejo de errores si no se encuentra el botón
    }
  }

  async animarError(index: number) {
    // Proporciona una animación de error a un campo de entrada
    await Haptics.vibrate(); // Proporciona feedback háptico
    this.anim.create()
      .addElement(document.querySelectorAll("input")[index]) // Selecciona el campo de entrada correspondiente
      .duration(200) // Duración de la animación
      .iterations(3) // Número de repeticiones
      .keyframes([
        { offset: 0, transform: "translateX(0px)", border: "10px red solid" },
        { offset: 0.25, transform: "translateX(-5px)", border: "8px red solid" },
        { offset: 0.5, transform: "translateX(0px)", border: "6px red solid" },
        { offset: 0.75, transform: "translateX(5px)", border: "4px red solid" },
        { offset: 1, transform: "translateX(0px)", border: "1px red solid" },
      ])
      .play(); // Reproduce la animación
  }

  resetPass() {
    console.log('Correo ingresado:', this.correo);
    console.log('Usuarios en localStorage:', this.nombreUsuario);
    console.log(localStorage.getItem('usuarios'));
    const usuariosGuardados = localStorage.getItem('usuarios');
  
    if (!usuariosGuardados) {
      this.alerta('No hay usuarios registrados.', () => {});
      return;
    }
  
    try {
      // Intentar parsear los usuarios como un array
      const usuarios = JSON.parse(usuariosGuardados);
  
      // Verificar que sea un array válido
      if (!Array.isArray(usuarios)) {
        throw new Error('Formato inválido en localStorage.');
      }
  
      // Buscar al usuario por correo
      const usuarioEncontrado = usuarios.find(
        (u) => u.correo && u.correo.trim().toLowerCase() === this.correo.trim().toLowerCase()
      );
  
      if (!usuarioEncontrado) {
        this.alerta('El correo no fue encontrado.', () => {});
        return;
      }
  
      const nuevaClave = Math.random().toString(36).slice(-6);
      usuarioEncontrado.contrasena = nuevaClave; // Cambiamos la clave aquí
  
      // Actualizar almacenamiento local
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      // Crear el body del request
      const body = {
        usuario: usuarioEncontrado.Usuario, // Usa el campo "Usuario"
        app: 'TowerRegister',
        clave: nuevaClave,
        email: usuarioEncontrado.correo, // Usa "correo" para enviar a la API
      };
  
      // Enviar los datos a la API
      this.http.post('https://myths.cl/api/reset_password.php', body).subscribe(
        (data) => {
          console.log('Respuesta de la API:', data);
          this.showSuccessAlert();
        },
        (error) => {
          console.error('Error al enviar los datos a la API:', error);
          this.alerta('No se pudo enviar la solicitud. Inténtalo de nuevo.', () => {});
        }
      );
    } catch (error) {
      console.error('Error al procesar los datos del almacenamiento local:', error);
      this.alerta('Ocurrió un problema con los datos locales. Por favor, verifica los datos.', () => {});
    }
  }

  // Función que muestra una alerta
  alerta(texto: string, accion: () => void) {
    this.alert
      .create({
        header: 'Error',
        message: texto,
        buttons: [
          {
            text: 'Aceptar',
            handler: accion,
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async showSuccessAlert() {
    const alert = await this.alert.create({
      header: 'Éxito',
      message:
        'La contraseña ha sido cambiada con éxito. Porfavor ingresa a tu correo',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertError(message: string) {
    const alert = await this.alert.create({
      header: 'Error', // Título de la alerta
      message: message, // Mensaje de error
      buttons: ['OK'] // Botones de la alerta
    });

    await alert.present(); // Presenta la alerta
  }

  async presentAlertSuccess(message: string) {
    // Crea y presenta una alerta de éxito con un mensaje personalizado
    const alert = await this.alert.create({
      header: 'Éxito', // Título de la alerta
      message: message, // Mensaje de éxito
      buttons: ['OK'] // Botones de la alerta
    });

    await alert.present(); // Presenta la alerta
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen; 
    console.log('Estado de apertura del modal:', this.isModalOpen); 
    console.log(localStorage.getItem('usuarios'));
  }
  correo = '';
  nombreUsuario = '';
 
  deslizarContenedor() {
    this.anim.create()
      .addElement(document.querySelector(".marco")!)
      .duration(900)
      .iterations(1)
      .direction("normal")
      .easing("ease-in-out")
      .fromTo('transform', 'translateX(400px)', 'translateX(0px)',)
      .fromTo('opacity', '0.2', '1')
      .play();
  }


}
