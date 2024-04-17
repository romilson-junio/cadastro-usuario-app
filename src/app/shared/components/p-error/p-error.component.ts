import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-error',
  templateUrl: './p-error.component.html',
  styleUrls: ['./p-error.component.css']
})
export class PErrorComponent {

  @Input() error: boolean = false;
  @Input() message?: string;

  ngOnInit(): void { }

  constructor() { }
}
