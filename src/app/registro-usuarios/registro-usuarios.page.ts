import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.page.html',
  styleUrls: ['./registro-usuarios.page.scss'],
})
export class RegistroUsuariosPage {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  contrasena: string = '';
  icono: string = 'oscuro';

  constructor(private router: Router, private alertController: AlertController) {}

  cambiarTema() {
    if (this.icono === "oscuro") {
      // Configuraciones para el tema claro
      document.documentElement.style.setProperty("--fondo", "#373737");
      document.documentElement.style.setProperty("--textos", "#000000");
      document.documentElement.style.setProperty("--icono", "#171844");
      document.documentElement.style.setProperty("--background-image", "url('/assets/fondonodonegro.jpg')");
      document.documentElement.style.setProperty("--fondo-input", "#d7a995");
      document.documentElement.style.setProperty("--icono-tema", "#ffffff" );
      this.icono = "claro"; // Actualiza el estado del icono
      localStorage.setItem('theme', 'claro');
    } else {
      // Configuraciones para el tema oscuro
      document.documentElement.style.setProperty("--fondo", "#454E5F");
      document.documentElement.style.setProperty("--fondo-input", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#53C5F2");
      document.documentElement.style.setProperty("--textos", "#000000");
      document.documentElement.style.setProperty("--background-image", "url('/assets/clarof.avif')");
      document.documentElement.style.setProperty("--icono-tema", "#000000" );
      this.icono = "oscuro"; // Actualiza el estado del icono
      localStorage.setItem('theme', 'oscuro'); 
    }
  }

  registrar() {
    if (this.nombre && this.apellido && this.nombreUsuario && this.correo && this.contrasena) {
      // Obtener usuarios guardados previamente en LocalStorage
      let usuariosGuardados = localStorage.getItem('usuarios');
      let usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

      // Verificar si el nombre de usuario ya está registrado
      const existeUsuario = usuarios.find((user: any) => user.nombreUsuario === this.nombreUsuario);

      if (existeUsuario) {
        this.presentAlert('Error', 'El nombre de usuario ya existe. Intenta con otro.');
      } else {
        // Agregar el nuevo usuario al array de usuarios
        usuarios.push({
          nombre: this.nombre,
          apellido: this.apellido,
          rut: this.rut,
          nombreUsuario: this.nombreUsuario,
          correo: this.correo,
          contrasena: this.contrasena
          
        });
        // Guardar nuevamente en LocalStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar mensaje de éxito y redirigir al login
        this.presentAlert('Éxito', 'Usuario registrado correctamente.');
        this.router.navigate(['/home']); // Redirigir al login

      }
    } else {
      this.presentAlert('Error', 'Todos los campos son obligatorios.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  volver() {
    this.router.navigate(['/home']); // Volver al login
  }
}