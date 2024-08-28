import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBack4Component } from './test-back4.component';

describe('TestBack4Component', () => {
  let component: TestBack4Component;
  let fixture: ComponentFixture<TestBack4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBack4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBack4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
