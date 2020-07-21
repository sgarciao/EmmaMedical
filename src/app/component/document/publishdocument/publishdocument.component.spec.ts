import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishdocumentComponent } from './publishdocument.component';

describe('PublishdocumentComponent', () => {
  let component: PublishdocumentComponent;
  let fixture: ComponentFixture<PublishdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
