import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SearchService } from '../../../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  currentRouteIsMail: boolean = false;
  el: HTMLInputElement = this.elementRef.nativeElement;

  constructor(private searchService: SearchService,
              private elementRef: ElementRef,
              private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRouteIsMail = this.router.url.split('/').filter(item => item).indexOf('mail') > -1;
        if (!this.currentRouteIsMail) {
          (this.el.querySelector('input.form-control') as HTMLInputElement).value = '';
        }
      }
    });

    // subscribe to clear input event
    this.searchService.subscribeToClear(flag => {
      if (flag) {
        (this.el.querySelector('input.form-control') as HTMLInputElement).value = '';
      }
    });

    // subscribe to fill input event
    this.searchService.subscribeToFillInput(value => {
        (this.el.querySelector('input.form-control') as HTMLInputElement).value = value;
    })
  }

  searchLetters(evt, value) {
    const code = (evt.keyCode ? evt.keyCode : evt.which);
    if (code === 1 || code === 13) { // click or enter
      this.router.navigate([`mail/search/${value}`]);
    }
  }

}
