import { Component, Input, SimpleChange } from '@angular/core';
import {
  showNotification,
  includeLetters,
  includeNumbers,
  includeSymbols,
  includeWhitespace,
} from 'src/utils/';
import { COLORS, PASSWORD_LENGTH } from '../constants';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent {
  @Input() public passwordToCheck: string;

  bar0: string;
  bar1: string;
  bar2: string;
  infoMessage: string;

  private colors = COLORS;

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.infoMessage = '';
    this.setBarColors(3, 0);

    const password = changes['passwordToCheck'].currentValue;
    if (password) {
      const { bars, strengthLevel } = this.checkStrength(password);
      this.setBarColors(bars, strengthLevel);
    }
  }

  private checkStrength(password: string): {
    bars: number;
    strengthLevel: number;
  } {
    // if include whiteSpace return without checking
    if (includeWhitespace(password)) {
      this.infoMessage = showNotification({ message: 3 });
      return { bars: 3, strengthLevel: 1 };
    }
    // if password is too short return without further checking
    if (password.length < PASSWORD_LENGTH) {
      this.infoMessage = showNotification({ message: 4 });
      return { bars: 3, strengthLevel: 1 };
    }

    // checking password strength and return an arr of results
    let strengthLevel = 0;
    const letters = includeLetters(password);
    const numbers = includeNumbers(password);
    const symbols = includeSymbols(password);
    const levels = [letters, numbers, symbols];

    for (const level of levels) {
      strengthLevel += level === true ? 1 : 0;
    }
    this.infoMessage = showNotification({ levels });
    return { bars: strengthLevel, strengthLevel };
  }
  // coloring the bars
  private setBarColors(bars: number, strengthLevel: number) {
    for (let n = 0; n < bars; n++) {
      (this as any)['bar' + n] = this.colors[strengthLevel];
    }
  }
}
