import {Injectable} from 'angular2/core';
import {LocalNotifications} from 'ionic-native';
import Medicine from './medicine';
import {Storage, SqlStorage}from 'ionic-angular';
import * as moment from 'moment';
import {SettingsService}from './../settings/settings.service';

@Injectable()
export class MedicinesNotificationService {

  private storage:Storage;
  private settingsService:SettingsService;

  constructor(settingsService:SettingsService) {
    this.storage = new Storage(SqlStorage);
    this.storage.query(`CREATE TABLE IF NOT EXISTS medicine_reminder (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, hours TEXT)`);
    this.settingsService = settingsService;
  }

  schedule(medicine:Medicine) {
    this.findAll().then((result) => {
      if (medicine.morning && !result.get('MORNING')) {
        this.scheduleSingle('MORNING', this.settingsService.morningHours);
      }
      if (medicine.midday && !result.get('MIDDAY')) {
        this.scheduleSingle('MIDDAY', this.settingsService.middayHours);
      }
      if (medicine.evening && !result.get('EVENING')) {
        this.scheduleSingle('EVENING', this.settingsService.eveningHours);
      }
    });
  }

  unschedule2(medicines:Medicine[]) {
    if (medicines.every((medicine) => {
          return !medicine.morning
        })) {
      this.unsheduleSingle('MORNING');
    }
    if (medicines.every((medicine) => {
          return !medicine.midday
        })) {
      this.unsheduleSingle('MIDDAY');
    }
    if (medicines.every((medicine) => {
          return !medicine.evening
        })) {
      this.unsheduleSingle('EVENING');
    }
  }

  unsheduleSingle(type:string) {
    this.storage.query(`select * from medicine_reminder where type = '${type}'`).then((data) => {
      if (data.res.rows.length > 0) {
        let row = data.res.rows.item(0);
        LocalNotifications.cancel(row.id);
        this.storage.query(`delete from medicine_reminder where id = ${row.id}`);
      }
    })
  }

  private findAll() {
    return this.storage.query(`select * from medicine_reminder`).then((data) => {
      let rows = data.res.rows;
      let result = new Map();
      for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        result.set(item.type, item);
      }
      return result;
    })
  }

  private scheduleSingle(type, hours) {
    this.storage.query(`INSERT INTO medicine_reminder ( type, hours) values ('${type}', '${hours}')`).then((data) => {
      let [hh, mm] = hours.split(':');
      let hoursDate = moment().hours(hh).minutes(mm);
      if (hoursDate.toDate() < new Date()) {
        hoursDate.add(1, 'h');
      }
      var now = new Date().getTime();
      LocalNotifications.schedule({
        id: data.id,
        text: "Take your pills!",
        sound: null,
        every: 'day',
        at: new Date(hoursDate.valueOf())
      });
    })
  };

}
