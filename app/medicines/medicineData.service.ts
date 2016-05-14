import {Injectable} from 'angular2/core';
import Medicine from './medicine';
import {MedicinesNotificationService} from './medicinesNotification.service';
import {Storage, SqlStorage} from 'ionic-angular';

@Injectable()
export class MedicineDataService {


  private id: number = 1;
  private medicines = [];

  private mns: MedicinesNotificationService;
  private storage: Storage;

  constructor(mns: MedicinesNotificationService) {
    this.mns = mns;
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)');
		this.loadMedicines();
  }

	loadMedicines() {
		this.storage.query(`select * from medicine`).then((data) => {
			let len = data.res.rows.length;
			for (let i=0; i<len; i++){
				let row = data.res.rows.item(i);
				this.medicines.push(new Medicine(row.id, row.name, row.quantity, undefined));
			}
		});
	}

  getMedicines() {
    return Promise.resolve(this.medicines);
  }

  addMedicine(medicine: Medicine) {
		this.storage.query(`INSERT INTO medicine (name, quantity) values ('${medicine.name}', ${medicine.quantity})`).then((data) => {
			medicine.id = data.res.insertId;
			this.medicines.push(medicine);
			this.mns.schedule(medicine);
		});
  }

	updateMedicine(medicine: Medicine) {
		this.storage.query(`UPDATE medicine set name = '${medicine.name}', quantity = ${medicine.quantity} where id = ${medicine.id}`);
	}

  removeMedicine(medicine: Medicine) {
    this.medicines.splice(this.medicines.indexOf(medicine), 1);
  }

}
