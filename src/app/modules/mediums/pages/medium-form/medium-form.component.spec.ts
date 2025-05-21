import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumFormComponent } from './medium-form.component';

describe('MediumFormComponent', () => {
  let component: MediumFormComponent;
  let fixture: ComponentFixture<MediumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
