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

export class CustomTranspiler implements TranslocoTranspiler {
  transpile(value: any, params: HashMap | undefined, translation: Translation) {
    return value;
  }
}

// From: https://github.com/ngneat/transloco/blob/94dab8edc1e245fafbef2cddf5cbb30f34412990/libs/transloco/src/lib/transloco.directive.ts#L34
type TranslateFn = (key: string, params?: HashMap) => any;
interface ViewContext {
  $implicit: TranslateFn;
  currentLang: string;
}

@Directive({selector: '[translocoCustom]'})
// @ts-ignore
export class CustomTranslocoDirective extends TranslocoDirective {

  protected override translationMemo: Record<string, { value: any; params?: HashMap }> = {};
  constructor(
    private override translocoService: TranslocoService,
    @Optional() protected override tpl: TemplateRef<ViewContext>,
    @Optional()
    @Inject(TRANSLOCO_SCOPE)
    private override providerScope: MaybeArray<TranslocoScope>,
    @Optional()
    @Inject(TRANSLOCO_LANG)
    private override providerLang: string | undefined,
    @Optional()
    @Inject(TRANSLOCO_LOADING_TEMPLATE)
    private override providedLoadingTpl: Type<unknown> | string,
    private override vcr: ViewContainerRef,
    private override cdr: ChangeDetectorRef,
    private override host: ElementRef,
    private override renderer: Renderer2,
    private readonly _sanitizer: DomSanitizer
  ) {
    super(translocoService, tpl, providerScope, providerLang, providedLoadingTpl, vcr, cdr, host, renderer);
  }
  protected override getTranslateFn(lang: string, read: string | undefined): TranslateFn {
    return (key: string, params?: HashMap) => {
      const withRead = read ? `${read}.${key}` : key;
      const withParams = params
        ? `${withRead}${JSON.stringify(params)}`
        : withRead;

      if (
        Object.prototype.hasOwnProperty.call(this.translationMemo, withParams)
      ) {
        return this.translationMemo[withParams].value;
      }

      console.log(this);
      console.log(key + " " + (new Error).stack);
      this.translationMemo[withParams] = {
        params,
        value: this.translocoService.translate(withRead, params, lang),
      };

      return this.translationMemo[withParams].value;
    };
  }
}

@NgModule({
  declarations: [CustomTranslocoDirective],
  exports: [ TranslocoModule, CustomTranslocoDirective],
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
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    { provide: TRANSLOCO_TRANSPILER, useClass: CustomTranspiler }
  ]
})
export class TranslocoRootModule {}
