import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrStreamComponent } from './flickr-stream.component';

describe('FlickrStreamComponent', () => {
  let component: FlickrStreamComponent;
  let fixture: ComponentFixture<FlickrStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlickrStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
