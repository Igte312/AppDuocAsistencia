import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperaContrasenaPage } from './recupera-contrasena.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RecuperaContrasenaPage', () => {
  let component: RecuperaContrasenaPage;
  let fixture: ComponentFixture<RecuperaContrasenaPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers:[RecuperaContrasenaPage],
      imports:[HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(RecuperaContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
