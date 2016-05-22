import{Injectable}from'angular2/core';
import Medicine from './medicine';
import {MedicinesNotificationService} from './medicinesNotification.service';
import {Storage, SqlStorage,}from 'ionic-angular';

@Injectable()
export class MedicineDataService {

  private id:number = 1;
  private medicines = [];

  private mns:MedicinesNotificationService;
  private storage:Storage;

  constructor(mns:MedicinesNotificationService) {
    this.mns = mns;
    this.storage = new Storage(SqlStorage);
    this.storage.query(`CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER, morning BOOLEAN, midday BOOLEAN, evening BOOLEAN)`);
    this.loadMedicines();
  }

  loadMedicines() {
    this.storage.query(`select * from medicine`).then((data) => {
      let len = data.res.rows.length;
      for (let i = 0; i < len; i++) {
        let row = data.res.rows.item(i);
        this.medicines.push(new Medicine(row.id, row.name, row.quantity, row.morning, row.midday, row.evening));
      }
    });
  }

  getMedicines() {
    return Promise.resolve(this.medicines);
  }

  addMedicine(medicine:Medicine) {
    this.storage.query(`INSERT INTO medicine (name, quantity, morning, midday, evening) 
      values ('${medicine.name}', ${medicine.quantity}, ${medicine.morning ? 1 : 0}, ${medicine.midday ? 1 : 0}, ${medicine.evening ? 1 : 0})`).then((data) => {
      medicine.id = data.res.insertId;
      this.medicines.push(medicine);
      this.mns.schedule(medicine);
    });
  }

  updateMedicine(medicine:Medicine) {
    this.storage.query(`UPDATE medicine set name = '${medicine.name}', quantity = ${medicine.quantity}, morning = ${medicine.morning ? 1 : 0}, 
    midday = ${medicine.midday ? 1 : 0}, evening = ${medicine.evening ? 1 : 0} where id = ${medicine.id}`).then((data) => {
      this.mns.schedule(medicine);
      this.mns.unschedule(this.medicines);
    })
  }

  removeMedicine(medicine:Medicine) {
    this.medicines.splice(this.medicines.indexOf(medicine), 1);
    this.storage.query(`DELETE from medicine where id = ${medicine.id}`);

    if (this.medicines.every((medicine) => {
          return !medicine.morning
        })) {
      this.mns.unsheduleSingle('MORNING');
    }
    if (this.medicines.every((medicine) => {
          return !medicine.midday
        })) {
      this.mns.unsheduleSingle('MIDDAY');
    }
    if (this.medicines.every((medicine) => {
          return !medicine.evening
        })) {
      this.mns.unsheduleSingle('EVENING');
    }
  }

}
