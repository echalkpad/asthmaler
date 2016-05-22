import {SettingsService} from './settings.service';

let settingsService:SettingsService = null;


describe('SettingsService', () => {

  beforeEach(() => {
    settingsService = new SettingsService();
  });

  it('should insert setting', () => {
    let morningHours = '11:11';
    let middayHours, eveningHours;

    spyOn(settingsService, 'insertSetting');
    settingsService.save(morningHours, middayHours, eveningHours);
    expect((<any>settingsService).insertSetting).toHaveBeenCalled()
  });

  it('should update setting', () => {
    let morningHours = '11:11';
    let middayHours, eveningHours;

    spyOn(settingsService, 'updateSetting');
    settingsService.morningHours = morningHours;
    settingsService.save(morningHours, middayHours, eveningHours);
    expect((<any>settingsService).updateSetting).toHaveBeenCalled()
  });

  it('should delete setting', () => {
    let morningHours = '11:11';
    let middayHours, eveningHours;
    spyOn(settingsService, 'removeSetting');
    settingsService.morningHours = morningHours;
    settingsService.save(undefined, middayHours, eveningHours);
    expect((<any>settingsService).removeSetting).toHaveBeenCalled()
  });


  it('it should map morning hour setting properly', () => {
    (<any>settingsService).mapSettings({
      rows : {
        0: {name: 'MORNING_HOURS', value: '11'},
        item: function(index) {return this[index]},
        length: 1}
    });
    expect((settingsService.morningHours)).toEqual('11');
  });

  it('it should map midday hour setting properly', () => {
    (<any>settingsService).mapSettings({
      rows : {
        0: {name: 'MIDDAY_HOURS', value: '12'},
        item: function(index) {return this[index]},
        length: 1}
    });
    expect((settingsService.middayHours)).toEqual('12');
  });

  it('it should map evening hour setting properly', () => {
    (<any>settingsService).mapSettings({
      rows : {
        0: {name: 'EVENING_HOURS', value: '13'},
        item: function(index) {return this[index]},
        length: 1}
    });
    expect((settingsService.eveningHours)).toEqual('13');
  });

  it('should set morning hour properly', () => {
    (<any>settingsService).setSetting('MORNING_HOURS', '11');
    expect((<any>settingsService).morningHours).toEqual('11')
  })

});

