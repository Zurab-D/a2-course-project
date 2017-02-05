import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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


  constructor(private lettersService: LettersService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
    // get letter from resolved data
    this.tmpLetter = this.route.snapshot.data['letter'];
    // this.tmpLetter = this.route.data.pluck('letter');
  }


  ngOnInit() {

    if (!this.tmpLetter) {
      console.log('letter not resolved & got from server!!!');

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
                  });
            }
        });
    } else {
      console.log('letter resolved.');
      this.letter = this.tmpLetter;
    }

  }


  clickBack() {
    this.location.back();
  }


  clickSave(form: HTMLElement) {
    this.letter.to = (form.querySelector('.mail-to') as HTMLInputElement).value;
    this.letter.body = (form.querySelector('.mail-body') as HTMLInputElement).value;
    this.letter.subject = (form.querySelector('.mail-subject') as HTMLInputElement).value;
    this.lettersService
        .saveLetter(this.letter)
        .subscribe((dat) => {
          this.router.navigate(['/mail/sent']);
        });
  }

}
