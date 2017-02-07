/**
 * This myForm is reactive
 * User editing myForm (user-edit) is template-driven
 */


import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/pluck';

import { LettersService } from '../../services/letters.service';
import { Letter, ILetter } from '../../interfaces/letter';

@Component({
  selector: 'app-mail-edit',
  templateUrl: './mail-edit.component.html',
  styleUrls: ['./mail-edit.component.css']
})
export class MailEditComponent implements OnInit {

  private id: string;
  public letter: ILetter = new Letter();
  public tmpLetter: ILetter = undefined;

  public myForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private lettersService: LettersService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
  }


  ngOnInit() {
    // try to get letter from resolved data
    // this.tmpLetter = this.route.snapshot.data['letter'];
    this.route.data.pluck('letter').subscribe((data: ILetter) => this.tmpLetter = data);

    if (!this.tmpLetter) {
      console.log('letter not resolved -> go get it from server!!!');

      // get letter from the server
      this.route
          .params
          .subscribe(params => {
            this.id = params['id'] || '';
            console.log(`=====>> MailEdit :: this.id = ${this.id}`);
            if (this.id) {
              this.lettersService
                  .getById(this.id)
                  .subscribe(data => {
                    this.letter = data;
                    /**
                     * ЗДЕСЬ приложение падает - formGroup expects a FormGroup instance. Please pass one in.
                     * т.е. если мы пытаемся открыть по прямой ссылке письмо
                     */

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
    /**
     * ЗДЕСЬ мне не нравится что вызов this.createForm() нужно прописывать дважды, но как сделать иначе?
     */
  }

  createForm(letter?: ILetter) {
    if (letter) {
      this.myForm = this.formBuilder.group({
        'to': this.letter.to,
        'subject': this.letter.subject,
        'body': this.letter.body
      });
    } else {
      this.myForm = this.formBuilder.group({
        'to': undefined,
        'subject': undefined,
        'body': undefined
      });
    }
  }


  onSubmit(): void {
    console.log('you submitted value:', this.myForm.value);
    this.letter.to = this.myForm.value.to;
    this.letter.body = this.myForm.value.body;
    this.letter.subject = this.myForm.value.subject;
    console.log(this.letter);

    this.lettersService
        .saveLetter(this.letter)
        .subscribe((dat) => {
          this.router.navigate(['/mail/sent']);
        },
        err => console.log('ERROR: ' + err)
        );
  }

  clickBack() {
    this.location.back();
  }

}
