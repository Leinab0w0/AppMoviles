import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private icono: string = 'oscuro';

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.icono = storedTheme;
      this.applyTheme();
    }
  }

  cambiarTema() {
    if (this.icono === 'oscuro') {
      this.applyLightTheme();
    } else {
      this.applyDarkTheme();
    }
  }

  private applyDarkTheme() {
    document.documentElement.style.setProperty('--fondo', '#373737');
    document.documentElement.style.setProperty('--textos', '#ffffff');
    document.documentElement.style.setProperty('--icono', '#171844');
    document.documentElement.style.setProperty('--background-image', "url('/assets/fondonodonegro.jpg')");
    document.documentElement.style.setProperty('--fondo-input', '#d7a995');
    this.icono = 'claro';
    localStorage.setItem('theme', 'claro');
  }

  private applyLightTheme() {
    document.documentElement.style.setProperty('--fondo', '#454E5F');
    document.documentElement.style.setProperty('--fondo-input', '#ffffff');
    document.documentElement.style.setProperty('--icono', '#53C5F2');
    document.documentElement.style.setProperty('--textos', '#000000');
    document.documentElement.style.setProperty('--background-image', "url('/assets/clarof.avif')");
    this.icono = 'oscuro';
    localStorage.setItem('theme', 'oscuro');
  }

  private applyTheme() {
    if (this.icono === 'claro') {
      this.applyLightTheme();
    } else {
      this.applyDarkTheme();
    }
  }
}
