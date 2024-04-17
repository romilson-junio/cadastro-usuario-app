import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'p-field-required',
  templateUrl: './p-field-required.component.html',
  styleUrls: ['./p-field-required.component.css']
})
export class PFieldRequiredComponent implements OnInit {

  @Input() error: boolean = false;
  @Input() field?: string;
  ngOnInit(): void { }

  constructor() { }

}
