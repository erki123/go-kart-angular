import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceComponent } from './race.component';

describe('RacesComponent', () => {
  let component: RaceComponent;
  let fixture: ComponentFixture<RaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});