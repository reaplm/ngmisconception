import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Misconception } from './misconception';

describe('Misconception', () => {
  let component: Misconception;
  let fixture: ComponentFixture<Misconception>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Misconception],
    }).compileComponents();

    fixture = TestBed.createComponent(Misconception);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
