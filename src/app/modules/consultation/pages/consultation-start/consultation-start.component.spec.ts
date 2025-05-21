import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationStartComponent } from './consultation-start.component';

describe('ConsultationStartComponent', () => {
  let component: ConsultationStartComponent;
  let fixture: ComponentFixture<ConsultationStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
