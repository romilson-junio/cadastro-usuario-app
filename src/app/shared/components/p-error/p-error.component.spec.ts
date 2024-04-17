import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PErrorComponent } from './p-error.component';

describe('PErrorComponent', () => {
  let component: PErrorComponent;
  let fixture: ComponentFixture<PErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
