import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.component.html',
  styleUrls: ['./escanear.component.scss'],
})
export class EscanearComponent  implements OnInit {
  scan() {
    throw new Error('Method not implemented.');
  }
  barcodes(barcodes: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {}

}
