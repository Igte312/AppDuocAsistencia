import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { EscanearComponent } from './escanear/escanear.component';
import { VerAsistenciaComponent } from './ver-asistencia/ver-asistencia.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {path:'verAsistencia',component:VerAsistenciaComponent},
      {path:'escanear',component:EscanearComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
