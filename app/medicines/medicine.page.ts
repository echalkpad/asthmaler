import {Page, NavController, NavParams} from 'ionic-angular';
import Medicine from './medicine';
import {MedicineDataService} from './medicineData.service';
import {SettingsService} from './../settings/settings.service'

@Page({
  templateUrl: 'build/medicines/medicine.page.html',
})
export class MedicinePage {

  medicine:Medicine;
  private nav:NavController;
  private mds:MedicineDataService;
  private originalMedicine:Medicine;
  private settingsService:SettingsService;

  constructor(nav:NavController, navParams:NavParams, mds:MedicineDataService, settingsService:SettingsService) {
    this.nav = nav;
    this.medicine = Object.assign({}, navParams.get('medicine'));
    this.originalMedicine = navParams.data.medicine;
    this.settingsService = settingsService;
    this.mds = mds;
  }

  save() {
    Object.assign(this.originalMedicine, this.medicine);
    if (!this.medicine.id) {
      this.mds.addMedicine(this.originalMedicine);
    } else {
      this.mds.updateMedicine(this.originalMedicine);
    }
    this.nav.pop();
  }

  isMorningAvail() {
    return this.settingsService.morningHours;
  }

  isMiddayAvail() {
    return this.settingsService.middayHours;
  }

  isEveningAvail() {
    return this.settingsService.eveningHours;
  }

  delete() {
    this.mds.removeMedicine(this.originalMedicine);
    this.nav.pop();
  }

}
