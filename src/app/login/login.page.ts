import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  users = [
    { userName: 'Pato', password: 'pene' },
    { userName: 'Ignacio', password: 'admi' },
    { userName: 'user3', password: '1234' },
  ];
  user={
    userName:"",
    password:""
  }

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}


  async ingresar() {
    const foundUser = this.users.find(
      (u) => u.userName === this.user.userName && u.password === this.user.password
    );

    if (foundUser) {
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user, // Passing the authenticated user
        },
      };
      this.router.navigate(['/home'], navigationExtras);
    } else if (this.user.userName === '' || this.user.password === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Asegúrate de ingresar datos en los campos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    
    
    } else {
      console.log('Credenciales incorrectas');
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrecto',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  recuperaContrasena() {
    let navigationExtras: NavigationExtras ={
      state: {
        users: this.users // Pasar el arreglo de usuarios a la página de recupera-contrasena
      }
    };
    this.router.navigate(['/recupera-contrasena'], navigationExtras);
  }

}

//recupera-contrasena