import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {Animation, AnimationController} from '@ionic/angular'
//import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})


export class LoginPage implements OnInit {
  hide = true;
  users = [
    { userName: 'Pato', password: '1234' },
    { userName: 'Ignacio', password: 'admi' },
    { userName: 'user3', password: '1111' },
  ];
  user={
    userName:"",
    password:""
  }
  apellido : any ;
  nombreN : any ;

  public state:string = "inactive";

  @ViewChild("efectoLogin", {read: ElementRef, static: true}) efectoLogin!: ElementRef;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {
     
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setInterval(() => {
      const animation = this.animationCtrl
        .create()
        .addElement(this.efectoLogin.nativeElement)
        .duration(3000) 
        .keyframes([
          { offset: 0, transform: 'rotateX(0deg)', opacity: 0.2 },
          { offset: 0, transform: 'rotateY(360deg)', opacity: 0.2 },
        ]);
  
      animation.play();
    }, 5000); // Iniciar la animación cada 5 segundos (5000 milisegundos)
  }
  
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