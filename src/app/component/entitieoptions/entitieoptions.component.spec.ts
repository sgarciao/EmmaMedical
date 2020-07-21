import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitieoptionsComponent } from './entitieoptions.component';

describe('EntitieoptionsComponent', () => {
  let component: EntitieoptionsComponent;
  let fixture: ComponentFixture<EntitieoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitieoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitieoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
