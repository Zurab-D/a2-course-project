import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { SearchService } from '../../../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  currentRouteIsMail: boolean = false;

  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRouteIsMail = this.router.url.split('/').filter(item => item).indexOf('mail') > -1;
      }
    });
  }

  searchLetters(evt, value) {
    const code = (evt.keyCode ? evt.keyCode : evt.which);
    if (code === 1 || code === 13) { // click or enter
      this.searchService.search(value);
    }
  }

}
