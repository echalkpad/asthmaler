import {MedicineDataService} from './medicineData.service'
import {MedicinesNotificationService} from './medicinesNotification.service';
import {SettingsService} from './../settings/settings.service';
import Medicine from './medicine';

describe('MedicineDataService', () => {

  let medicineDataService: MedicineDataService = null;
  let medicinesNotificationService: MedicinesNotificationService = null;
  let settingsService: SettingsService = null;


  let medicine1 = new Medicine(1, 'Medicine 1', 40, false, true, true);
  let medicine2 = new Medicine(2, 'Medicine 2', 30, true, true, true);

  beforeEach(() => {
    settingsService = new SettingsService();
    medicinesNotificationService = new MedicinesNotificationService(settingsService);
    medicineDataService = new MedicineDataService(medicinesNotificationService);
  });


  it('should load medicines properly', (done) => {
    let fetchMedicinesReturnValue = new Promise((resolve) => {resolve({
        0: medicine1,
        1: medicine2,
        item: function(index) {return this[index]},
        length: 2
    })});
    spyOn(medicineDataService, 'fetchMedicines').and.returnValue(fetchMedicinesReturnValue);
    medicineDataService.loadMedicines().then(() => {
      expect((<any>medicineDataService).medicines).toEqual([medicine1, medicine2]);
      done();
    });
  })

});
