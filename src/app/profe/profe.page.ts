import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-profe',
  templateUrl: './profe.page.html',
  styleUrls: ['./profe.page.scss'],
})
export class ProfePage implements OnInit {

  userName: string = "hola";
  selectedSegment: string = "ver-asistencia";
  data: any;
  qrCodeImage: string | null = null;
  mail: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    public navCtrl: NavController,
  ) {
   this.userName = 'Hola';
   this.data.userName = "AAA";

  }
  ngOnInit() {
    try{if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.router.getCurrentNavigation()?.extras?.state) {
          this.data = this.router.getCurrentNavigation()?.extras?.state?.['user'];
          console.log(this.data);
        } else {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }}
    catch{}
  }
  
  cerrarSesion(){
    localStorage.removeItem('ingresado')
    this.navCtrl.navigateRoot(['/login']);
  }

  async desplegarQR() {
    if (this.data && this.data.userName) {
      const contenidoQR = this.data.userName + "@profesor.duoc.cl";
      console.log(contenidoQR);

      try {
        this.qrCodeImage = await QRCode.toDataURL(contenidoQR);
      } catch (error) {
        console.error('Error al generar el código QR:', error);
      }
    } else {
      console.error('No hay datos de usuario disponibles.');
    }
  }
}
