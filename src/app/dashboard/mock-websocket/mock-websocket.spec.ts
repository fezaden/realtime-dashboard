import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockWebsocket } from './mock-websocket';

describe('MockWebsocket', () => {
  let component: MockWebsocket;
  let fixture: ComponentFixture<MockWebsocket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockWebsocket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockWebsocket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
