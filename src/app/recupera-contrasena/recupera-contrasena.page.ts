import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recupera-contrasena',
  templateUrl: './recupera-contrasena.page.html',
  styleUrls: ['./recupera-contrasena.page.scss'],
})
export class RecuperaContrasenaPage {

  users = [
    { userName: 'Pato', password: '1234' },
    { userName: 'Ignacio', password: 'admi' },
    { userName: 'user3', password: '1111' },
  ];

  // se crea la variable para que el imput la reciba 
  usernameInput: string = ''; // <ion-input type="text" [(ngModel)]="usernameInput"></ion-input>
  
  // Constructor del componente que inyecta el servicio AlertController
  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }
  // Función asincrónica que se llama cuando se presiona el botón "Aceptar"
  async mostrarContrasena() {
    // Buscar el usuario ingresado en la lista de usuarios
    const user = this.users.find(u => u.userName === this.usernameInput);
    
    // Verificar si el usuario existe
    if (user) {
      
      // Crear una alerta con la contraseña del usuario
      const alert = await this.alertController.create({
        header: 'Contraseña',
        message: `La contraseña del usuario ${user.userName} se ha enviado al correo electrónico`,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              // Redirigir al usuario de nuevo a la página de inicio de sesión
              this.router.navigate(['/login']);
            }
          }
        ],
      });
      // Mostrar la alerta
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

  irALogin() {
    let navigationExtras: NavigationExtras ={
      
    };
    this.router.navigate(['/login'], navigationExtras);
  }
}




