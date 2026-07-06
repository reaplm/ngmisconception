import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Misconceptions } from './misconceptions';

describe('Misconceptions', () => {
  let component: Misconceptions;
  let fixture: ComponentFixture<Misconceptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Misconceptions],
    }).compileComponents();

    fixture = TestBed.createComponent(Misconceptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
