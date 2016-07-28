import {MedicinesNotificationService} from './medicinesNotification.service';
import {SettingsService} from './../settings/settings.service';
import Medicine from '../medicines/medicine';

describe('MedicinesNotificationService', () => {

  let mns:MedicinesNotificationService = null;
  let settingsService:SettingsService = null;
  let morningHours = '11:11';
  let middayHours = '14:14';
  let eveningHours = '20:20';

  let morningMedicine = new Medicine(1, 'Medicine 1', 50, true, false, false);
  let middayMedicine = new Medicine(2, 'Medicine 2', 50, false, true, false);
  let eveningMedicine = new Medicine(3, 'Medicine 3', 50, false, false, true);

  let prepareGetFunctionStub = (key, value) => {
    return (_key) => {
      if(_key == _key) {
        return value;
      }
    }
  };

  beforeEach(() => {
    settingsService = new SettingsService();
    mns = new MedicinesNotificationService(settingsService);
    settingsService.morningHours = morningHours;
    settingsService.middayHours = middayHours;
    settingsService.eveningHours = eveningHours;
  });

  it('should try to schedule morning medicine', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('MORNING', false)})});
    spyOn(mns, 'scheduleSingle');
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    mns.schedule(morningMedicine).then(() => {
      expect((<any>mns).scheduleSingle).toHaveBeenCalledWith('MORNING', morningHours);
      done();
    });
  });

  it('should insert morning notification to storage', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('MORNING', false)})});
    let insertNotificationReturn = new Promise((resolve) => resolve(true));
    spyOn(mns, 'insertNotification').and.returnValue(insertNotificationReturn);
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    mns.schedule(morningMedicine).then(() => {
      expect((<any>mns).insertNotification).toHaveBeenCalledWith('MORNING', morningHours);
      done();
    });
  });

  it('should schedule morning local notification', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('MORNING', false)})});
    let insertNotificationReturn = new Promise((resolve) => resolve(true));
    spyOn(mns, 'insertNotification').and.returnValue(insertNotificationReturn);
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    spyOn(mns, 'scheduleLocalNotification');
    mns.schedule(morningMedicine).then(() => {
      expect((<any>mns).scheduleLocalNotification).toHaveBeenCalled();
      done();
    });
  });

  it('should try to schedule midday medicine', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('MIDDAY', false)})});
    spyOn(mns, 'scheduleSingle');
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    mns.schedule(middayMedicine).then(() => {
      expect((<any>mns).scheduleSingle).toHaveBeenCalledWith('MIDDAY', middayHours);
      done();
    });
  });

  it('should insert midday notification to storage', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('MIDDAY', false)})});
    let insertNotificationReturn = new Promise((resolve) => resolve(true));
    spyOn(mns, 'insertNotification').and.returnValue(insertNotificationReturn);
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    mns.schedule(middayMedicine).then(() => {
      expect((<any>mns).insertNotification).toHaveBeenCalledWith('MIDDAY', middayHours);
      done();
    });
  });

  it('should schedule midday local notification', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('MIDDAY', false)})});
    let insertNotificationReturn = new Promise((resolve) => resolve(true));
    spyOn(mns, 'insertNotification').and.returnValue(insertNotificationReturn);
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    spyOn(mns, 'scheduleLocalNotification');
    mns.schedule(middayMedicine).then(() => {
      expect((<any>mns).scheduleLocalNotification).toHaveBeenCalled();
      done();
    });
  });
  

  it('should try to schedule evening medicine', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('EVENING', false)})});
    spyOn(mns, 'scheduleSingle');
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    mns.schedule(eveningMedicine).then(() => {
      expect((<any>mns).scheduleSingle).toHaveBeenCalledWith('EVENING', eveningHours);
      done();
    });
  });


  it('should insert evening notification to storage', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('EVENING', false)})});
    let insertNotificationReturn = new Promise((resolve) => resolve(true));
    spyOn(mns, 'insertNotification').and.returnValue(insertNotificationReturn);
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    mns.schedule(eveningMedicine).then(() => {
      expect((<any>mns).insertNotification).toHaveBeenCalledWith('EVENING', eveningHours);
      done();
    });
  });

  it('should schedule evening local notification', (done) => {
    let findAllReturn = new Promise((resolve) => {resolve({get: prepareGetFunctionStub('EVENING', false)})});
    let insertNotificationReturn = new Promise((resolve) => resolve(true));
    spyOn(mns, 'insertNotification').and.returnValue(insertNotificationReturn);
    spyOn(mns, 'findAll').and.returnValue(findAllReturn);
    spyOn(mns, 'scheduleLocalNotification');
    mns.schedule(eveningMedicine).then(() => {
      expect((<any>mns).scheduleLocalNotification).toHaveBeenCalled();
      done();
    });
  });




});
