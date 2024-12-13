import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  icono = 'oscuro';  
  usuario: any;      
  scannedResult: string = '';  
  asistencia: any[] = [];    

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const usuarioJSON = localStorage.getItem('user');
    if (usuarioJSON) {
      this.usuario = JSON.parse(usuarioJSON);
    } else {
      console.log('No hay datos de usuario en localStorage');
    }
  }

  ionViewWillEnter() {
    console.log("La vista está a punto de entrar");
    this.asistencia=this.getAsistenciaGuardado(); 
    console.log(this.asistencia)
  }

  getAsistenciaGuardado() {
    const asistenciaGuardado = localStorage.getItem('asistencia');
    return asistenciaGuardado ? JSON.parse(asistenciaGuardado) : [];
  }

  navigateRegistro() {
    this.router.navigate(['/registro']);
  }

  cambiarTema() {
    if (this.icono === "oscuro") {
      // Configuraciones para el tema claro
      document.documentElement.style.setProperty("--fondo", "#373737");
      document.documentElement.style.setProperty("--textos", "#ffffff");
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

  // Función para escanear el QR
  async startScan() {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });

      if (result?.ScanResult) {
        this.scannedResult = result.ScanResult;

        const qrData = result.ScanResult.split("--");

        // if (qrData.length === 2) {
          const asistencia = {
            codigo: qrData[0],
            ramo: qrData[1],
            alumno: `${this.usuario.nombre} ${this.usuario.apellido}`,
            fechaAsistencia: new Date(),
          };
          console.log(asistencia)
          this.asistencia.push(asistencia);
          localStorage.setItem('asistencia', JSON.stringify(this.asistencia));

          this.showToast('Asistencia registrada correctamente');
        } else {
          this.showToast('Formato de QR no válido');
        }
      // } else {
      //   this.showToast('QR vacío o no escaneado correctamente');
      // }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      this.showToast('Error al escanear el QR');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  perfil() {
    this.router.navigate(['/perfil']);  // Cambia a la ruta "alumno"
  }

}