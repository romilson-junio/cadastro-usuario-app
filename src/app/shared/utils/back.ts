import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctions {
  constructor() { }

  public back(): void {
    window.history.back();
  }

}

