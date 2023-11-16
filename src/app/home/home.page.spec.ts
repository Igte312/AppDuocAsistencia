import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ZBar } from '@ionic-native/zbar/ngx';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    /*await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({}) } }

        },ZBar
      ]
    }).compileComponents();*/
    await TestBed.configureTestingModule({
      /*declarations: [HomePage],*/
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers:[ZBar]
      /*providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({}) } }

        },ZBar
      ]*/
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
