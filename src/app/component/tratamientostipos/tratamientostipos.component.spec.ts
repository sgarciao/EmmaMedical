import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientostiposComponent } from './tratamientostipos.component';

describe('TratamientostiposComponent', () => {
  let component: TratamientostiposComponent;
  let fixture: ComponentFixture<TratamientostiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientostiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientostiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
