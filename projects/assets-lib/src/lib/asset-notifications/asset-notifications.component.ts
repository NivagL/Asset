import { Component, OnInit, Input } from '@angular/core';

import { Asset } from '../_models/index';

@Component({
  selector: 'astlib-asset-notifications',
  templateUrl: './asset-notifications.component.html',
  styleUrls: ['./asset-notifications.component.css']
})
export class AssetNotificationsComponent implements OnInit {

  @Input() asset: Asset;

  constructor() { }

  ngOnInit() {
  }

}
