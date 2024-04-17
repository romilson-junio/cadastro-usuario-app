import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFieldRequiredComponent } from './p-field-required.component';

describe('PFieldRequiredComponent', () => {
  let component: PFieldRequiredComponent;
  let fixture: ComponentFixture<PFieldRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PFieldRequiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PFieldRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
