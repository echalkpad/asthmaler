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
    let morningHoursRemoved = this.settingsService.morningHours && !this.morningHours;
    let middayHoursRemoved = this.settingsService.middayHours && !this.middayHours;
    let eveningHoursRemoved = this.settingsService.eveningHours && !this.eveningHours;


    this.settingsService.morningHours = this.morningHours;
    this.settingsService.middayHours = this.middayHours;
    this.settingsService.eveningHours = this.eveningHours;
    this.settingsService.save().then(() => {
      let alert = Alert.create({
        title: 'Settings saved',
        buttons: ['OK']
      });
      this.nav.present(alert);
    });
  }

}
