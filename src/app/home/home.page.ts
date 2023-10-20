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
  selectedSegment: string = "ver-asistencia";
  data: any;

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

  }
  
  cerrarSesion(){
    localStorage.removeItem('ingresado')
    this.navCtrl.navigateRoot(['/login']);
  }
}
