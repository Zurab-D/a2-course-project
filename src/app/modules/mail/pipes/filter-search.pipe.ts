import { Pipe, PipeTransform } from '@angular/core';

import { ILetter } from '../../../interfaces/letter';



@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  constructor () { }

  transform(letters: ILetter[], searchValue: string): any {
    if (!searchValue) {
      return letters;
    }

    if (letters) {
      return letters.filter((letter: ILetter) => JSON.stringify(letter).indexOf(searchValue) >= 0);
    }
  }

}
