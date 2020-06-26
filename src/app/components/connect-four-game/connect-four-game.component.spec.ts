import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFourGameComponent } from './connect-four-game.component';

describe('ConnectFourGameComponent', () => {
  let component: ConnectFourGameComponent;
  let fixture: ComponentFixture<ConnectFourGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectFourGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectFourGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
