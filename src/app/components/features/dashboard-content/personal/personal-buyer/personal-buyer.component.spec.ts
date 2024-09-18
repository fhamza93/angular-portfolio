import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBuyerComponent } from './personal-buyer.component';

describe('PersonalBuyerComponent', () => {
  let component: PersonalBuyerComponent;
  let fixture: ComponentFixture<PersonalBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
