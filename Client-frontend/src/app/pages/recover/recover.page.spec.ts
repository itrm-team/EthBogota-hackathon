import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Recover } from './recover.page';

describe('Recover', () => {
  let component: Recover;
  let fixture: ComponentFixture<Recover>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Recover ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Recover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
