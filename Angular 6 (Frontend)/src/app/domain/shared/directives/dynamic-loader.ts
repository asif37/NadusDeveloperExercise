import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicLoaderHost]',
})
export class dynamicLoaderHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}