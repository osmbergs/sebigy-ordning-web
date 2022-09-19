import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreResultLayoutComponent } from './score-result-layout.component';

describe('ScoreResultLayoutComponent', () => {
  let component: ScoreResultLayoutComponent;
  let fixture: ComponentFixture<ScoreResultLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreResultLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreResultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
