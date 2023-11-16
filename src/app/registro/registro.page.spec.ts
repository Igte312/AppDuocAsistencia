import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers:[RegistroPage],
      imports:[HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
