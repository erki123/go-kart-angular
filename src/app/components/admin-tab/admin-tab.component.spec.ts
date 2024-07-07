import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTabComponent } from './admin-tab.component';

describe('HomeComponent', () => {
  let component: AdminTabComponent;
  let fixture: ComponentFixture<AdminTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});