import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.setInitialAppTheme();
  }

  setInitialAppTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'claro') {
      document.documentElement.style.setProperty("--fondo", "#373737");
      document.documentElement.style.setProperty("--textos", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#171844");
      document.documentElement.style.setProperty("--background-image", "url('/assets/fondonodonegro.jpg')");
      document.documentElement.style.setProperty("--fondo-input", "#d7a995");
    } else {
      document.documentElement.style.setProperty("--fondo", "#454E5F");
      document.documentElement.style.setProperty("--fondo-input", "#ffffff");
      document.documentElement.style.setProperty("--icono", "#53C5F2");
      document.documentElement.style.setProperty("--textos", "#00000");
      document.documentElement.style.setProperty("--background-image", "url('/assets/clarof.avif')");
    }
  }
}
