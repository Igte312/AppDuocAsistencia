import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController
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

  async guardar(){
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:'Error de ingreso',
        subHeader: '',
        message: 'Llene los espacios en blanco',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    var userLocal = {
      userName: f.userName,
      mail: f.mail,
      password: f.password
    }

    localStorage.setItem('userLocal',JSON.stringify(userLocal));
  }
}
