import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular'
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';
import { FakeApiService } from '../servicio/fake-api.service';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})

export class LoginPage implements OnInit {


  formularioLogin: FormGroup;



  public state:string = "inactive";

  @ViewChild("efectoLogin", {read: ElementRef, static: true}) efectoLogin!: ElementRef;

  constructor(
    public fb: FormBuilder,
    public navCtrl: NavController,
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private fakeApiService: FakeApiService
  ) { 
    this.formularioLogin = this.fb.group({
      'userName': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }
  

  ngOnInit() {}


  async ingresar() {
    var f = this.formularioLogin.value;
    let NavigationExtras: NavigationExtras = {
      state: {
        user: this.formularioLogin.value
      }
    }

    this.fakeApiService.obtenerUsuarios().subscribe(
      (usuarios) => {
        const usuario = usuarios.find(u => u.userName === f.userName && u.password === f.password);
        const dominio = usuario.mail.split('@')[1];
        if (usuario && dominio === 'duocuc.cl') {
          console.log('Usuario autenticado:', usuario);
          localStorage.setItem('ingresado', 'true');
          //this.navCtrl.navigateRoot(['/home/verAsistencia', { userName: f.userName}]);
          this.router.navigate(['/home/verAsistencia'], NavigationExtras);
          // this.navCtrl.navigateRoot(['profe', { userName: f.userName }]);
          // this.router.navigate(['profe'], NavigationExtras);
        }else if (usuario && dominio === 'profesor.duoc.cl'){
          console.log('Usuario autenticado:', usuario);
          localStorage.setItem('ingresado', 'true');
          // this.navCtrl.navigateRoot(['/home/verAsistencia', { userName: f.userName }]);
          // this.router.navigate(['/home/verAsistencia'], NavigationExtras);
          //this.navCtrl.navigateRoot(['profe', { userName: f.userName}]);
          this.router.navigate(['profe'], NavigationExtras);
        } else {
          this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
        this.mostrarAlerta('Error', 'No se pudo obtener la lista de usuarios.');
      }
    );
  }
   
  



  async mostrarAlerta(header: string, message: string) {    
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }





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
    }, 5000);
  }
}

