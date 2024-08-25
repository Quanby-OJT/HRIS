import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBack3Component } from './test-back3.component';

describe('TestBack3Component', () => {
  let component: TestBack3Component;
  let fixture: ComponentFixture<TestBack3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBack3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBack3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
