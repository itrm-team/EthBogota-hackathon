import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ButtonLinkAyudaComponent } from './button-link-ayuda.component';

describe('ButtonLinkAyudaComponent', () => {
  let component: ButtonLinkAyudaComponent;
  let fixture: ComponentFixture<ButtonLinkAyudaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonLinkAyudaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonLinkAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
