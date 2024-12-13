import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { RegistroUsuariosPageRoutingModule } from './registro-usuarios-routing.module';
import { RegistroUsuariosPage } from './registro-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de incluirlo aquí
    IonicModule,
    RegistroUsuariosPageRoutingModule
  ],
  declarations: [RegistroUsuariosPage]
})
export class RegistroUsuariosPageModule {}
