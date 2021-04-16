import { Component } from '@angular/core';

import { Subject } from 'rxjs';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  template: '<ngx-loading [show]="loading | async"></ngx-loading>'
})
export class LoaderComponent {

  public loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) { }

}
