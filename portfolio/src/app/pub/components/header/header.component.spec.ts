import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavResponsiveExample } from './header.component';

describe('SidenavResponsiveExample', () => {
  let component: SidenavResponsiveExample;
  let fixture: ComponentFixture<SidenavResponsiveExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavResponsiveExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavResponsiveExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
