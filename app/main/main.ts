import {Page} from 'ionic-angular';
import {MedicinesPage} from './../medicines/medicines.page';
import {HealthPage} from './../health/health.page';

@Page({
  templateUrl: 'build/main/main.page.html',
})
export class MainPage {

  medicinesPageRoot: any = MedicinesPage;
  healthPageRoot: any = HealthPage;

  constructor() {

  }

}
