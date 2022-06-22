import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  imageChangedEvent: any;
  base64: any;

  constructor() { }

  ngOnInit(): void {
  }


}
