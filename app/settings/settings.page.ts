import {Page} from 'ionic-angular';
import {SettingsService} from './settings.service';
import {Alert, NavController} from 'ionic-angular';
import set = Reflect.set;

@Page({
  templateUrl: 'build/settings/settings.page.html',
})
export class SettingsPage {

  private settingsService:SettingsService;
  private nav:NavController;

  morningHours:string;
  middayHours:string;
  eveningHours:string;

  constructor(nav:NavController, settingsService:SettingsService) {
    this.nav = nav;
    this.settingsService = settingsService;
    this.morningHours = settingsService.morningHours;
    this.middayHours = settingsService.middayHours;
    this.eveningHours = settingsService.eveningHours;
  }

  save() {
    this.settingsService.save(this.morningHours, this.middayHours, this.eveningHours).then(() => {
      let alert = Alert.create({
        title: 'Settings saved',
        buttons: ['OK']
      });
      this.nav.present(alert);
    });
  }

}
