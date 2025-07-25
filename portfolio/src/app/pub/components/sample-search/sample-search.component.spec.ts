import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSearchComponent } from './sample-search.component';

describe('SampleSearchComponent', () => {
  let component: SampleSearchComponent;
  let fixture: ComponentFixture<SampleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
