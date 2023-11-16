import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers:[LoginPage],
      imports:[HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
