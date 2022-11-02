import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndexItemComponent } from './list-index-item.component';

describe('ListIndexItemComponent', () => {
  let component: ListIndexItemComponent;
  let fixture: ComponentFixture<ListIndexItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIndexItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIndexItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
