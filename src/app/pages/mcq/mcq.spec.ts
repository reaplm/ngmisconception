import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mcq } from './mcq';

describe('Mcq', () => {
  let component: Mcq;
  let fixture: ComponentFixture<Mcq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mcq],
    }).compileComponents();

    fixture = TestBed.createComponent(Mcq);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
