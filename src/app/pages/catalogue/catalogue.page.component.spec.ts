import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePageComponent } from './catalogue.page.component';

describe('Catalogue.PageComponent', () => {
  let component: CataloguePageComponent;
  let fixture: ComponentFixture<CataloguePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CataloguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
