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

  userName: string = "";
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
    this.activatedRoute.queryParams.subscribe((params) => {
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
  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   this.userName = params['userName'];
    // });
    this.userName = this.activatedRoute.snapshot.paramMap.get('userName') || '';
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mail = params['mail'];
    });
  }
  
  cerrarSesion(){
    localStorage.removeItem('ingresado')
    this.navCtrl.navigateRoot(['/login']);
  }

  async desplegarQR(){
    const contenidoQR = this.data.userName+"@profesor.duoc.cl";;
    console.log(contenidoQR)
    try {
      this.qrCodeImage = await QRCode.toDataURL(contenidoQR);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  }


}
