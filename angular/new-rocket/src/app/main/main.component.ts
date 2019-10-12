import { Component, OnInit } from '@angular/core';

import { cards } from '../../cards';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  cards = cards;
  constructor() { }

  ngOnInit() {
  }

}
