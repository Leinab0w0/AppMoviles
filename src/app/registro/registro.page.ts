import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Asegúrate de importar Router

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {

  icono = "oscuro";
  usuario: any;
  user: any;
  asistencia: Array<{ codigo: string; ramo: string; alumno: string; fecha: string }> = [];

  constructor(
    private navCtrl: NavController,
    private anim: AnimationController,
    private alertController: AlertController,
    private toast: ToastController,
    private router: Router  // Inyecta el Router
  ) { }

  // Función para cambiar entre tema claro y oscuro
  cambiarTema() {
    if (this.icono === "oscuro") {
      document.documentElement.style.setProperty("--fondo", "#373737");
      document.documentElement.style.setProperty("--textos", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#171844");
      document.documentElement.style.setProperty("--background-image", "url('/assets/fondonodonegro.jpg')");
      document.documentElement.style.setProperty("--fondo-input", "#d7a995");
      document.documentElement.style.setProperty("--icono-tema", "#ffffff" );
      this.icono = "claro"; 
      localStorage.setItem('theme', 'claro');
    } else {
      document.documentElement.style.setProperty("--fondo", "#454E5F");
      document.documentElement.style.setProperty("--fondo-input", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#53C5F2");
      document.documentElement.style.setProperty("--textos", "#000000");
      document.documentElement.style.setProperty("--background-image", "url('/assets/clarof.avif')");
      document.documentElement.style.setProperty("--icono-tema", "#000000" );
      this.icono = "oscuro"; 
      localStorage.setItem('theme', 'oscuro');
    }
  }

  ionViewWillEnter() {
    console.log("La vista está a punto de entrar");
    this.asistencia = this.getAsistenciaGuardado();
    console.log(this.asistencia);
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

  getAsistenciaGuardado() {
    const asistenciaGuardado = localStorage.getItem('asistencia');
    return asistenciaGuardado ? JSON.parse(asistenciaGuardado) : null;
  }

  // Función que navega a la página "alumno"
  volver() {
    this.router.navigate(['/alumno']);  // Cambia a la ruta "alumno"
  }

}