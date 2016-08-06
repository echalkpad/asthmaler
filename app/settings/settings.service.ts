import {Injectable} from 'angular2/core';
import {Storage, SqlStorage}from 'ionic-angular';

@Injectable()
export class SettingsService {

  MORNING_HOURS_NAME = 'MORNING_HOURS';
  MIDDAY_HOURS_NAME = 'MIDDAY_HOURS';
  EVENING_HOURS_NAME = 'EVENING_HOURS';

  morningHours: string;
  middayHours: string;
  eveningHours: string;

  private storage: Storage;

  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query(`create table  if not exists settings (name TEXT, value TEXT)`);
    this.loadSettings().then((data => this.mapSettings(data.res)));
  }

  save(morningHours: string, middayHours: string, eveningHours: string) {
    return Promise.all([
      this.saveSetting(this.MORNING_HOURS_NAME, morningHours),
      this.saveSetting(this.MIDDAY_HOURS_NAME, middayHours),
      this.saveSetting(this.EVENING_HOURS_NAME, eveningHours)
    ]);
  }

  private saveSetting(name, value) {
    let actualValue = this.getSetting(name);
    if (value && actualValue) {
      return this.updateSetting(name, value);
    } else if (value && !actualValue) {
      return this.insertSetting(name, value);
    } else if (!value && actualValue) {
      return this.removeSetting(name);
    } else {
      return new Promise((resolve) => resolve(true));
    }
  }

  private getSetting(name): string {
    switch (name) {
      case this.MORNING_HOURS_NAME:
        return this.morningHours;
      case this.MIDDAY_HOURS_NAME:
        return this.middayHours;
      case this.EVENING_HOURS_NAME:
        return this.eveningHours;
    }
  }

  private setSetting(name, value) {
    switch (name) {
      case this.MORNING_HOURS_NAME:
        this.morningHours = value;
      case this.MIDDAY_HOURS_NAME:
        this.middayHours = value;
      case this.EVENING_HOURS_NAME:
        this.eveningHours = value;
    }
  }

  private insertSetting(name, value) {
    return this.storage.query(`insert into settings (name, value) values ('${name}', '${value}')`);
  }

  private updateSetting(name, value) {
    return this.storage.query(`update settings set value = '${value}' where name = '${name}'`)
  }

  private removeSetting(name) {
    return this.storage.query(`delete from settings where name = '${name}'`);
  }

  private loadSettings() {
    return this.storage.query(`select name, value from settings `);
  }

  private mapSettings(sqlResult) {
    for (let i = 0; i < sqlResult.rows.length; i++) {
      let row = sqlResult.rows.item(i);
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
  }
}
