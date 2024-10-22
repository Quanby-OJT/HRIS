import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBackComponent } from './test-back.component';

describe('TestBackComponent', () => {
  let component: TestBackComponent;
  let fixture: ComponentFixture<TestBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
