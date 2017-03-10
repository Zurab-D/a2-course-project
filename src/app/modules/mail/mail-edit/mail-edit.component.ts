/** This myForm is reactive
 *  User editing myForm (user-edit) is template-driven
 */


import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

import { LettersService } from '../../../services/letters.service';
import { Letter, ILetter } from '../../../interfaces/letter';
import { DeleteAllButtonService } from '../../../services/delete-all-button.service';

@Component({
  selector: 'app-mail-edit',
  templateUrl: './mail-edit.component.html',
  styleUrls: ['./mail-edit.component.css']
})
export class MailEditComponent implements OnInit, AfterViewInit {

  private id: string;
  public letter: ILetter = new Letter();
  public tmpLetter: ILetter = undefined;
  public allBtnService$;

  public myForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private lettersService: LettersService,
              private deleteAllButtonService: DeleteAllButtonService,
              private route: ActivatedRoute,
              private router: Router) {
    this.createForm();
  }


  ngAfterViewInit() {
  }


  ngOnInit() {
    // try to get letter from resolved data
    this.tmpLetter = this.route.snapshot.data['letter'];
    // this.route.data.pluck('letter').subscribe((data: ILetter) => this.tmpLetter = data);

    if (!this.tmpLetter) {
      console.log('letter not resolved -> go get it from server!!!');

      // get letter from the server
      this.route
          .params
          .subscribe(params => {
            this.id = params['id'] || '';
            if (this.id) {
              this.lettersService
                  .getById(this.id)
                  .subscribe(data => {
                    this.letter = data;
                    this.createForm(this.letter);
                  });
            } else {
              this.createForm();
            }
        });
    } else {
      console.log('letter resolved.');
      this.letter = this.tmpLetter;
      this.createForm(this.letter);
    }
    /** ЗДЕСЬ мне не нравится что вызов this.createForm() нужно прописывать дважды,
     *  но как сделать иначе?
     */

    // ------------------------------------------------------------
    this.allBtnService$ = this.deleteAllButtonService.subscribe(() => {
      const deleting: ILetter[] = [this.letter];

      this.lettersService
        .delete(deleting, res => {
          this.lettersService.flagRefresh = true;
          this.allBtnService$.unsubscribe();
          this.navigateToParrent();
        });
    });
  }


  ngOnDestroy() {
    this.allBtnService$.unsubscribe();
  }


  createForm(letter?: ILetter) {
    if (letter) {
      this.myForm = this.formBuilder.group({
        'to': [letter.to, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
        'subject': [letter.subject, [], /*[this.askSubject] <<-- НЕ ЗАРАБОТАЛО...*/],
        'body': [letter.body, []],
      });
    } else {
      this.myForm = this.formBuilder.group({
        'to': [undefined, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
        'subject': [undefined, [], /*[this.askSubject]*/],
        'body': [undefined, []],
      });
    }
  }


  askSubject() {
    console.log('askSubject() -1-');

    return Observable.of(
      (function(self) {
        console.log('askSubject() -2-');
        let res = true;
        if (self && self.myForm && self.myForm.value.subject === '') {
          res = window.confirm('Subject is empty. Continue?');
        };
        return { ASYNC_ERROR: res };
      }(this))
    );
  }


  onSubmit(): void {
    if (this.myForm.valid) {
      this.letter.to = this.myForm.value.to;
      this.letter.body = this.myForm.value.body;
      this.letter.subject = this.myForm.value.subject;

      if (this.letter._id) {
        // patch existing letter
        this.lettersService
            .patchLetter(this.letter)
            .subscribe(
              null,
              err => console.log('ERROR: ' + err),
              () => this.navigateToParrent()
            );
      } else {
        // create a new letter
        this.lettersService
            .createLetter(this.letter)
            .subscribe(
              null,
              err => console.log('ERROR: ' + err),
              () => this.router.navigate(['/mail/Sent'])
            );
      }
    } else {
        // touch all controls
        for (const ctrl in this.myForm.controls) {
          if (this.myForm.controls[ctrl]) {
            this.myForm.controls[ctrl].markAsTouched();
          }
        }

    }
  }


  navigateToParrent() {
    const arr = this.router.url.split('/').filter(item => !!item);
    const destUrl = arr.slice(0, arr.length - 1).join('/');

    this.router.navigate([`/${destUrl}`]);
  }

}
