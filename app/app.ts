import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MainPage} from './main/main.page';
import {MedicineDataService} from './medicines/medicineData.service';
import {MedicinesNotificationService} from './medicines/medicinesNotification.service';
import {SettingsService} from './settings/settings.service';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [MedicineDataService, MedicinesNotificationService, SettingsService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {

  rootPage:any = MainPage;

  constructor(platform:Platform) {
    platform.ready().then(() => {


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
