import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  userName: string = "";


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    public navCtrl: NavController,
  ) {
    
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['userName'];
    });
  }
  
  cerrarSesion(){
    localStorage.removeItem('ingresado')
    this.navCtrl.navigateRoot(['/home']);
  }
}
