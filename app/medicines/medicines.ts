import {Page, Modal, NavController} from 'ionic-angular';
import {MedicinePage} from './medicine.page';
import {MedicineDataService} from './medicineData.service';
import Medicine from './medicine';

@Page({
  templateUrl: 'build/medicines/medicines.html'
})
export class MedicinesPage {

  private nav: NavController;
  private mds: MedicineDataService;
  medicines: Medicine[];

  constructor(nav: NavController, medicineDataService: MedicineDataService) {
    this.nav = nav;
    this.mds = medicineDataService;
  }

  onPageDidEnter() {
    this.mds.getMedicines().then((medicines) => {
      this.medicines = medicines;
      console.log(medicines);
      console.log(this.medicines)
    })
  }

  openMedicine(medicine: Medicine) {
    this.nav.push(MedicinePage, { "medicine": medicine });
  }

  newMedicine() {
    this.nav.push(MedicinePage, { "medicine": new Medicine(undefined, undefined, undefined) });
  }

}
