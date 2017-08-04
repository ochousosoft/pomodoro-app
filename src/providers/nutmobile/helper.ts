import { Injectable} from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import * as moment from 'moment';
import {TranslateService} from "ng2-translate";

import { UserData } from './user-data';

@Injectable()
export class Helper {

  push : any;

  pushRegistered: boolean;

  constructor(public translateServ: TranslateService, public userData : UserData, public events: Events, public platform: Platform) {
  }

  //supports any format (allows optional 'hours' parameter for adding hours duration to 'sDateIsoString' date )
  // Lunes -> dddd
  // Lun -> ddd
  // 15 Feb -> DD MMM
  // 22:38 -> HH:mm
  public formatDate(sDateIsoString: any, format: any, hours: any): string {
    let lang = this.translateServ.currentLang;
    let date = moment(sDateIsoString);
    if (hours !== undefined && hours > 0) {
      date = moment(sDateIsoString).add(hours, 'hours');
    }
    return date.locale(lang).format(format);
  }

  public getPrice(price: any, hours: any, vat: any) {
    return (price*hours*(1+vat)).toFixed(2);
  }

  public getUnitPrice(unit: any, frequency: any) {
    if ('weekly' == frequency) {
      return unit + "/" + this.translate('COMMON.WEEK');
    }
    else {
      return unit;
    }
  }

  getStartDate(daysToSubtract: any) {
    return moment().subtract(daysToSubtract, 'days').toISOString();
  }

  getEndDate(daysToAdd: any) {
    return moment().add(daysToAdd, 'days').toISOString();
  }

  public translate(key: string) : string {
    if (!key || key==null){
      return 'Undefined';
    }
    return this.translateServ.instant(key);
  }

  public isPushEnabled(push: any) {
    if (push == undefined || push['error'] !== undefined) {
      return false;
    }
    return true;
  }

  // public registerPushNotifications() {
  //   console.log('Platform not ready: Waiting for register push notifications');
  //   this.platform.ready().then(() => {
  //   //should be called inside Platform ready
  //     console.log('Platform ready: Registering push notifications');
  //     console.log('Push registered: ' + this.pushRegistered);
  //     if (this.pushRegistered == true) {
  //       return;
  //     }
  //     else {
  //       this.push = Push.init({
  //         android: {
  //             senderID: Constants.PUSH_SENDER_ID
  //         },
  //         ios: {
  //             alert: "true",
  //             badge: true,
  //             sound: 'false'
  //         },
  //         windows: {}
  //       });
  //       if (this.isPushEnabled(this.push)) {
  //         //retrieve push token from app storage
  //         this.userData.getPushToken().then(pushT=>{
  //           if (pushT==null || pushT==undefined) {
  //             this.push.on('registration', (data) => {
  //               //register in application server
  //               this.proNotifications.registerPush(data.registrationId).subscribe(res=> {
  //                 this.pushRegistered = true;
  //                 console.log("Push registration: " + data.registrationId);
  //                 this.userData.savePushToken(data);
  //                 //register for new notifications
  //                 this.push.off('notification');
  //                 this.push.on('notification', (not) => {
  //                   console.log('Listening new notifications...');
  //                   this.events.publish('notification:on', not);
  //                   // console.log(data.message);
  //                   // console.log(data.title);
  //                   // console.log(data.count);
  //                   // console.log(data.sound);
  //                   // console.log(data.image);
  //                   // console.log(data.additionalData);
  //                 });
  //                 this.push.on('error', (e) => {
  //                   console.log('Error: ' + e.message);
  //                 });
  //               });
  //             });
  //           }
  //           else {
  //             console.log('Token retrieved from local cache: ' + pushT.registrationId);
  //             //already registered
  //             //device already registered, only need subscribe to notificaction
  //             this.push.off('notification');
  //             this.push.on('notification', (not) => {
  //                 //register with stored token
  //                 console.log('Used token: New Notification.');
  //                 this.events.publish('notification:on', not);
  //                 // console.log(data.message);
  //                 // console.log(data.title);
  //                 // console.log(data.count);
  //                 // console.log(data.sound);
  //                 // console.log(data.image);
  //                 // console.log(data.additionalData);
  //               });
  //               this.push.on('error', (e) => {
  //                 console.log('Error: ' + e.message);
  //               });
  //           }
  //         });
  //       };
  //     }
  //   });
  // };

  // public unregisterPushNotifications() {
  //   if (this.push !== undefined) {
  //     this.push.unregister((data) => {
  //         this.proNotifications.unregisterPush(data.registrationId).subscribe(data=> {
  //           this.userData.destroyPushToken();
  //           console.log("Push unregistered: " + data);
  //         });
  //     });
  //   }
  // };

}
