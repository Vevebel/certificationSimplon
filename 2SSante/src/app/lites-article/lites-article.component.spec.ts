import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitesArticleComponent } from './lites-article.component';

describe('LitesArticleComponent', () => {
  let component: LitesArticleComponent;
  let fixture: ComponentFixture<LitesArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LitesArticleComponent]
    });
    fixture = TestBed.createComponent(LitesArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
