import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoConacComponent } from './catalogo-conac.component';

describe('CatalogoConacComponent', () => {
  let component: CatalogoConacComponent;
  let fixture: ComponentFixture<CatalogoConacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoConacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoConacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
