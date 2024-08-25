import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBack2Component } from './test-back2.component';

describe('TestBack2Component', () => {
  let component: TestBack2Component;
  let fixture: ComponentFixture<TestBack2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBack2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBack2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
