import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  searchLetters(evt, value) {
    const code = (evt.keyCode ? evt.keyCode : evt.which);
    if (code === 1 || code === 13) { // click or enter
      this.searchService.search(value);
    }
  }

}
