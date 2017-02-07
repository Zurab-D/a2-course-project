import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/src/Observable';
import { FormGroup } from '@angular/forms';
import 'rxjs/src/add/observable/fromEvent';

// a data provider service
import { TypeaheadService } from '../../services/typeahead.service';


@Directive({
  selector: '[typeahead]'
})
export class TypedirectiveDirective implements OnInit {

  data: Array<string> = [];
  el: HTMLInputElement = this.elementRef.nativeElement;
  ul: HTMLUListElement;
  // @Input('typeahead') formGroup: FormGroup;
  @Input() typeahead: FormGroup;


  constructor(private elementRef: ElementRef,
              private typeaheadService: TypeaheadService) {
  }


  ngOnInit() {
    Observable.fromEvent(this.el, 'input')
      .subscribe(event => {
        if (event['target'].value.length > 2) {
          const txt: string = event['target'].value;

          this.createTypeahead();

          // get filtered data from the service
          this.typeaheadService
              .getDataFiltered(txt)
              .subscribe(data => this.fillTypeahead(data));
        } else {
          this.removeTypeahead();
        }
      });
  }


  createTypeahead() {
    if (!this.ul) {
      this.ul = document.createElement('ul');
      this.ul.className = 'typeahead';
      this.insertAfter(this.el, this.ul)
    }
  }


  fillTypeahead(arrData: Array<string>) {
    let li: HTMLElement;

    this.ul.innerHTML = '';
    if (arrData && arrData.length) {
      arrData.forEach(item => {
        li = document.createElement('li');
        li.innerText = item;
        li.addEventListener('click', this.liClickHandler.bind(this));
        this.ul.appendChild(li);
      });
    };
    this.ul.style.visibility = this.ul.querySelectorAll('li').length > 0 ? 'visible' : 'hidden';
  }


  removeTypeahead() {
    if (this.ul) {
      this.removeElement(this.ul);
      this.ul = undefined;
      this.el.focus();
    }
  }


  liClickHandler(evt: MouseEvent) {
    const txt = (evt.target as HTMLLIElement).innerText;
    this.typeahead.patchValue({'to': txt});
    this.removeTypeahead();
  }


  insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }


  removeElement(elem: HTMLElement | string) {
    const el = (typeof elem === 'string') ? document.getElementById('el') : elem;
    el.parentNode.removeChild(el);
    return false;
  }

}
