import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-mail-search',
  templateUrl: './mail-search.component.html',
  styleUrls: ['./mail-search.component.css']
})
export class MailSearchComponent implements OnInit, AfterViewInit {

  searchValue = '~';
  inited = false;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get search value from the router params
    this.route
        .params
        .subscribe(params => {
          // this.mailboxValue = '';
          this.searchValue = params['value'];
          this.searchService.fillInput(this.searchValue);

          if (this.inited) {
            this.searchService.search(this.searchValue);
          }
        });
  }

  ngAfterViewInit() {
    this.searchService.search(this.searchValue);
    this.inited = true;
  }

}
