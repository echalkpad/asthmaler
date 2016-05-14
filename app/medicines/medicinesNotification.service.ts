import {Injectable} from 'angular2/core';
import {LocalNotifications} from 'ionic-native';
import Medicine from './medicine';


@Injectable()
export class MedicinesNotificationService {


	constructor() {

	}


schedule(medicine: Medicine) {
	console.log('skedule');		
	LocalNotifications.schedule({
	  id: 1,
	  text: "Take your pills!",
	  sound: null,
		every: 'day',
		at: new Date()
	});
}



}
