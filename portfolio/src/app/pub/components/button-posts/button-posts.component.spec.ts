import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPostsComponent } from './button-posts.component';

describe('ButtonPostsComponent', () => {
  let component: ButtonPostsComponent;
  let fixture: ComponentFixture<ButtonPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
