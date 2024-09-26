import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsInfoComponent } from './cards-info.component';

describe('CardsInfoComponent', () => {
  let component: CardsInfoComponent;
  let fixture: ComponentFixture<CardsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
