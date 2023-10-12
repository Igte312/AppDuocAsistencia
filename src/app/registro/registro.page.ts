import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FakeApiService } from '../servicio/fake-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private fakeApiService: FakeApiService,

  ) { 
    this.formularioRegistro= this.fb.group({
      'userName': new FormControl("",Validators.required),
      'mail': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'password2': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  // async guardar(){
  //   var f = this.formularioRegistro.value;

  //   if (this.formularioRegistro.invalid){
  //     const alert = await this.alertController.create({
  //       header:'Error de ingreso',
  //       subHeader: '',
  //       message: 'Llene los espacios en blanco',
  //       buttons: ['Aceptar']
  //     });
  //     await alert.present();
  //     return;
  //   }

  //   var userLocal = {
  //     userName: f.userName,
  //     mail: f.mail,
  //     password: f.password
  //   }

  //   localStorage.setItem('userLocal',JSON.stringify(userLocal));
  //   const alert = await this.alertController.create({
  //     header:'Nuevo ingreso',
  //     subHeader: '',
  //     message: 'Usuario ingresado exitosamente',
  //     buttons: [{
  //       text: 'Aceptar',
  //       handler: () => {
  //         // Redirigir al usuario de nuevo a la página de inicio de sesión
  //         //this.router.navigate(['/login']);
  //         localStorage.setItem('ingresado', 'true')
  //         this.navCtrl.navigateRoot(['/login']);
  //       }
  //     }]
  //   });
  //   await alert.present();
  //   return;
  // }

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Error de ingreso',
        subHeader: '',
        message: 'Llene los espacios en blanco',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const newUser = {
      id: null,
      userName: f.userName,
      mail: f.mail,
      password: f.password,
      docente: 0 // Puedes ajustar este valor según tus necesidades
    };

    // Utiliza el servicio para agregar el nuevo usuario
    this.fakeApiService.agregarUsuario(newUser).subscribe(
      async (response) => {
        console.log('Usuario agregado:', response);
        const alert = await this.alertController.create({
          header: 'Nuevo ingreso',
          subHeader: '',
          message: 'Usuario ingresado exitosamente',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                localStorage.setItem('ingresado', 'true');
                this.navCtrl.navigateRoot(['/login']);
              },
            },
          ],
        });
        await alert.present();
      },
      async (error) => {
        console.error('Error al agregar usuario:', error);
        const alert = await this.alertController.create({
          header: 'Error al agregar usuario',
          subHeader: '',
          message: 'Hubo un problema al agregar el usuario.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    );
  }
}
