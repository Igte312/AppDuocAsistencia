import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfePage } from './profe.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';


describe('ProfePage', () => {
  let component: ProfePage;
  let fixture: ComponentFixture<ProfePage>;
 
  beforeEach(async() => {
   TestBed.configureTestingModule({
     declarations:[ProfePage],
     imports:[HttpClientTestingModule, RouterTestingModule],
     /*providers: [
       {
         provide: ActivatedRoute,
         useValue: {
           snapshot: { paramMap: convertToParamMap({}) },
         },
       },
     ],*/
   }).compileComponents();
 
   fixture = TestBed.createComponent(ProfePage);
   component = fixture.componentInstance;
   //component.userName = 'test'; // Aquí es donde inicializas la propiedad 'userName'
   fixture.detectChanges();
  });
 
  it('should create', () => {
   expect(component).toBeTruthy();
  });
 });