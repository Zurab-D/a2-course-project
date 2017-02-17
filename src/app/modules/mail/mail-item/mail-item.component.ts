import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILetter } from '../../../interfaces/letter';
import { LettersService } from '../../../services/letters.service';
import { CheckboxLetterService } from '../../../services/checkbox-letter.service';

@Component({
  selector: 'app-mail-item',
  templateUrl: './mail-item.component.html',
  styleUrls: ['./mail-item.component.css']
})
export class MailItemComponent {
  @Input() letter: ILetter;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor(private lettersService: LettersService,
              private checkboxLetterService: CheckboxLetterService) {
  }

  cbClick(letter: ILetter) {
    letter._checked = !letter._checked;
    this.clicked.emit();
  }

  letterClick() {
    this.lettersService.setCurrentLetter(this.letter);
    this.checkboxLetterService.click(false);
    this.checkboxLetterService.informAllChecked(false);
  }
}
