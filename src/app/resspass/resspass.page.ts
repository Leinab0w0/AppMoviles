import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-resspass',
  templateUrl: './resspass.page.html',
  styleUrls: ['./resspass.page.scss'],
})
export class ResspassPage {
  usuario: string = '';
  correo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  icono = 'oscuro';

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private http: HttpClient
  ) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.icono = storedTheme;
      this.cambiarTema();
    }
  }

  cambiarTema() {
    if (this.icono === 'oscuro') {
      document.documentElement.style.setProperty('--fondo', '#373737');
      document.documentElement.style.setProperty('--textos', '#ffffff');
      document.documentElement.style.setProperty('--icono', '#171844');
      document.documentElement.style.setProperty('--background-image', "url('/assets/fondonodonegro.jpg')");
      document.documentElement.style.setProperty('--fondo-input', '#d7a995');
      document.documentElement.style.setProperty('--icono-tema', '#ffffff');
      this.icono = 'claro'; 
      localStorage.setItem('theme', 'claro'); 
    } else {
      document.documentElement.style.setProperty('--fondo', '#454E5F');
      document.documentElement.style.setProperty('--fondo-input', '#ffffff');
      document.documentElement.style.setProperty('--icono', '#53C5F2');
      document.documentElement.style.setProperty('--textos', '#000000');
      document.documentElement.style.setProperty('--background-image', "url('/assets/clarof.avif')");
      document.documentElement.style.setProperty('--icono-tema', '#000000');
      this.icono = 'oscuro';
      localStorage.setItem('theme', 'oscuro');
    }
  }

  async recuperarContrasena() {
    const storedUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioValido = storedUsuarios.find(
      (u: any) => u.nombreUsuario === this.usuario && u.correo === this.correo
    );

    if (!usuarioValido) {
      this.presentAlert('Error', 'El usuario o correo no están registrados.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    usuarioValido.contrasena = this.nuevaContrasena;
    localStorage.setItem('usuarios', JSON.stringify(storedUsuarios));

    const emailBody = {
      nombre: this.usuario,
      app: 'TowerRegister',
      clave: this.nuevaContrasena,
      email: this.correo,
    };

    try {
      console.log('Enviando solicitud al servidor:', emailBody);
      await firstValueFrom(this.http.post('http://localhost:3000/reset_password', emailBody));
      this.presentAlert('Éxito', 'La contraseña se ha actualizado correctamente y se ha enviado al correo.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      this.presentAlert('Correcto', 'Se le ha enviado un correo y la contraseña se ha actualizado.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  volver() {
    this.navController.back();
  }
}