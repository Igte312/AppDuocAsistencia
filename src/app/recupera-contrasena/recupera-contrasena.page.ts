import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FakeApiService } from '../servicio/fake-api.service';


@Component({
  selector: 'app-recupera-contrasena',
  templateUrl: './recupera-contrasena.page.html',
  styleUrls: ['./recupera-contrasena.page.scss'],
})
export class RecuperaContrasenaPage {


  usernameInput: string = ''; 
  
  constructor(
    private router: Router,
    private alertController: AlertController,
    private fakeApiService: FakeApiService
  ) { }

  async mostrarContrasena() {
    this.fakeApiService.obtenerUsuarios().subscribe(
      async (usuarios) => {
        const usuario = usuarios.find(u => u.userName === this.usernameInput);
      
        if (usuario) {
          const alert = await this.alertController.create({
            header: 'Contraseña',
            message: `La contraseña del usuario ${usuario.userName} se ha enviado al correo electrónico`,
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.router.navigate(['/login']);
                }
              }
            ],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Usuario no encontrado',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      }  
    );
  }

  irALogin() {
    let navigationExtras: NavigationExtras ={
      
    };
    this.router.navigate(['/login'], navigationExtras);
  }
}




