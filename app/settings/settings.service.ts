import {Injectable} from 'angular2/core';
import {Storage, SqlStorage, Platform}from 'ionic-angular';

@Injectable()
export class SettingsService {


  MORNING_HOURS_NAME = 'MORNING_HOURS';
  MIDDAY_HOURS_NAME = 'MIDDAY_HOURS';
  EVENING_HOURS_NAME = 'EVENING_HOURS';

  morningHours:string;
  middayHours:string;
  eveningHours:string;

  private storage:Storage;
  private platform:Platform;

  constructor(platform:Platform) {
    this.platform = platform;
    platform.ready().then(() => {
      this.storage = new Storage(SqlStorage);
      this.storage.query(`create table  if not exists settings (name TEXT, value TEXT)`);
      this.loadSettings();
    });
  }

  save() {
    return Promise.all([
      this.saveSetting(this.MORNING_HOURS_NAME, this.morningHours),
      this.saveSetting(this.MIDDAY_HOURS_NAME, this.middayHours),
      this.saveSetting(this.EVENING_HOURS_NAME, this.eveningHours)
    ]);
  }

  private saveSetting(name, value) {
    if (value) {
      this.storage.query(`select * from settings where name = '${name}'`).then((data) => {
        if (data.res.rows.length === 0) {
          return this.storage.query(`insert into settings (name, value) values ('${name}', '${value}')`);
        } else {
          return this.storage.query(`update settings set value = '${value}' where name = '${name}'`);
        }
      });
    } else {
      return this.storage.query(`delete from settings where name = '${name}'`)
    }
  }

  private loadSettings() {
    this.storage.query(`select name, value from settings `).then((data) => {
      for (let i = 0; i < data.res.rows.length; i++) {
        let row = data.res.rows.item(i);
        switch (row.name) {
          case this.MORNING_HOURS_NAME:
            this.morningHours = row.value;
            break;
          case this.MIDDAY_HOURS_NAME:
            this.middayHours = row.value;
            break;
          case this.EVENING_HOURS_NAME:
            this.eveningHours = row.value;
            break;
        }
      }
    })
  }


}