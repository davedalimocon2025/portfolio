import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDisplay2Component } from './chart-display2.component';

describe('ChartDisplay2Component', () => {
  let component: ChartDisplay2Component;
  let fixture: ComponentFixture<ChartDisplay2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartDisplay2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDisplay2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
