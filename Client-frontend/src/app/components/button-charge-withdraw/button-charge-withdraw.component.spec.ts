import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ButtonChargeWithdrawComponent } from './button-charge-withdraw.component';

describe('ButtonChargeWithdrawComponent', () => {
  let component: ButtonChargeWithdrawComponent;
  let fixture: ComponentFixture<ButtonChargeWithdrawComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonChargeWithdrawComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonChargeWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
