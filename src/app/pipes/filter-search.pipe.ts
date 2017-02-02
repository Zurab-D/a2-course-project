import { Pipe, PipeTransform } from '@angular/core';
import { ILetter } from '../interfaces/letter';


@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(letters: ILetter[], searchValue: string): any {

    if (letters) {
      return letters.filter((letter: ILetter) => JSON.stringify(letter).indexOf(searchValue) >= 0);
    }

  }

}
