import { Component } from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CUSTOM_TITLE';

  constructor(public readonly translocoService: TranslocoService) {
  }

  public switchLang(): void {
    console.log(this.title);
    this.translocoService.setActiveLang(this.translocoService.getActiveLang() == 'en' ? 'nl' : 'en')
  }
}
