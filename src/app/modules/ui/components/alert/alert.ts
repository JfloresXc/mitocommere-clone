import { AlertService } from '@/shared/services/alert.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styles: ``,
})
export class Alert {
  alertService = inject(AlertService);
  alert = this.alertService.alert;
}
