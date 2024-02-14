import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMedecinsComponent } from './detail-medecins.component';

describe('DetailMedecinsComponent', () => {
  let component: DetailMedecinsComponent;
  let fixture: ComponentFixture<DetailMedecinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMedecinsComponent]
    });
    fixture = TestBed.createComponent(DetailMedecinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
