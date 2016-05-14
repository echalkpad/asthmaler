import {Page, NavController, NavParams} from 'ionic-angular';
import Medicine from './medicine';
import {MedicineDataService} from './medicineData.service';

@Page({
  templateUrl: 'build/medicines/medicine.page.html',
})
export class MedicinePage {

  medicine: Medicine;
  private nav: NavController
  private mds: MedicineDataService;
  private originalMedicine: Medicine;

  constructor(nav: NavController, navParams: NavParams, mds: MedicineDataService) {
    this.nav = nav;
		this.medicine = Object.assign({}, navParams.data.medicine);
    this.originalMedicine = navParams.data.medicine;
    this.mds = mds;
  }

  save() {
    Object.assign(this.originalMedicine, this.medicine);
    console.log(this.originalMedicine);
		if(!this.medicine.id) {
			this.mds.addMedicine(this.originalMedicine);
		}else {
      this.mds.updateMedicine(this.originalMedicine);
    }
    this.nav.pop();
  }

  delete() {
    this.mds.removeMedicine(this.originalMedicine);
    this.nav.pop();
  }

}
