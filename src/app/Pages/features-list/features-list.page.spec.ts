import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesListPage } from './features-list.page';

describe('FeaturesListPage', () => {
  let component: FeaturesListPage;
  let fixture: ComponentFixture<FeaturesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
