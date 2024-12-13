import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  icono = "oscuro";
 
  constructor(private navController: NavController) {}

  

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
      this.icono = "oscuro"; // Actualiza el estado del icono
      localStorage.setItem('theme', 'oscuro'); // Guarda la preferencia en localStorage
    }
  }

  ngOnInit() {
    this.cargarDatos();
    this.usuario = this.getUsuarioGuardado();
  }

  getUsuarioGuardado() {
    const usuarioGuardado = localStorage.getItem('user');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  cargarDatos() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
    } else {
      console.log('No hay datos de usuario en el localStorage');
    }
  }

  volver() {
  this.navController.back();
  }

}
