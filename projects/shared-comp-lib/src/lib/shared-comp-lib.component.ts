import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scl-shared-comp-lib',
  template: `
    <p>
      shared-comp-lib works!
    </p>
  `,
  styles: []
})
export class SharedCompLibComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
