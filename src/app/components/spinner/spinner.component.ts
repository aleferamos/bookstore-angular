import { Component, OnInit } from '@angular/core';
import { SpinnerHandlerService } from 'src/app/shared/service/Spinner_request/spinner-handler.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  spinnerActive: boolean = true;


  constructor(public spinnerHandler: SpinnerHandlerService) {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  ngOnInit(): void {
  }

  showSpinner = (state: boolean): void => {
    this.spinnerActive = state;
  };
}
