import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import {Animation, AnimationController} from '@ionic/angular'
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})

export class LoginPage implements OnInit {
  //userName
  //password

  formularioLogin: FormGroup;


  // users = [
  //   { userName: 'Pato', password: '1234' },
  //   { userName: 'Ignacio', password: 'admi' },
  //   { userName: 'user3', password: '1111' },
  // ];
  // user={
  //   userName:"",
  //   password:""
  // }

  public state:string = "inactive";

  @ViewChild("efectoLogin", {read: ElementRef, static: true}) efectoLogin!: ElementRef;

  constructor(
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) { 
    this.formularioLogin = this.fb.group({
      'userName': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
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
    var f = this.formularioLogin.value;

    var userLocal = localStorage.getItem('userLocal');
    var users = userLocal ? JSON.parse(userLocal) : null;

    if (users.userName == f.userName && users.password == f.password){
      console.log('ingresado')
      localStorage.setItem('ingresado', 'true')
      
      this.router.navigate(['/home', { userName: users.userName }]);
    } else {
      console.log('Credenciales incorrectas');
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrecto',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    
     /*
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
    }*/
  }

}

