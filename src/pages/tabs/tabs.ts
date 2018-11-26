import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RanksPage } from '../ranks/ranks';
import { AmateurPage } from '../amateur/amateur';
import { ProfessionalPage } from '../professional/professional';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RanksPage;
  tab2Root = AmateurPage;
  tab3Root = ProfessionalPage;

  constructor() {

  }
}
