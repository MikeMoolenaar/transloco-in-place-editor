import { HttpClient } from '@angular/common/http';
import { MaybeArray, Translation, TRANSLOCO_CONFIG, TRANSLOCO_LANG, TRANSLOCO_LOADER, TRANSLOCO_LOADING_TEMPLATE, TRANSLOCO_SCOPE, TRANSLOCO_TRANSPILER, translocoConfig, TranslocoDirective, TranslocoLoader, TranslocoModule, TranslocoScope, TranslocoService, TranslocoTranspiler } from '@ngneat/transloco';
import { ChangeDetectorRef, Directive, ElementRef, Inject, Injectable, NgModule, Optional, Renderer2, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { environment } from '../environments/environment';
import { HashMap } from '@ngneat/transloco/lib/types';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`http://localhost:7148/assets/${lang}.json`, {
      headers: {
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}

@NgModule({
  exports: [ TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'nl'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}
