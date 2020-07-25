import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabIcaPage } from './tab-ica.page';

describe('TabIcaPage', () => {
  let component: TabIcaPage;
  let fixture: ComponentFixture<TabIcaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabIcaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabIcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
