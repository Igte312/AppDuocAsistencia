import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  bDate: string = '';
  name: string = '';
  last_name: string = '';
  EducLevel: string = '';
  static user: string = '';

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      if (
        this.router.getCurrentNavigation()?.extras?.state
      ) {
        this.data = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        console.log(this.data);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async mostrarInformacion() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: 'su nombre es '+`${this.name} ${this.last_name}`,
      buttons: ['Yes'],
    });

    await alert.present();
  }

  nullfield() {
    this.name = '';
    this.last_name = '';
    this.EducLevel = '';
    this.bDate = '';
  }
}
