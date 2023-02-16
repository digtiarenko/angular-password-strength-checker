import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter,
} from '@angular/core';

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

  private colors = [
    'rgb(115 115 115)', //gray
    'rgb(220 38 38)', // red
    'rgb(234 88 12)', // orange
    'rgb(22 163 74)', // green
  ];

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.infoMessage = '';
    // const whitespaceRegExp = /\s/g;
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(3, this.colors[0]);

    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c?.index, c?.color);
    }
  }

  checkStrength(password: string) {
    const whitespaceRegExp = /\s/g;
    const symbolRegex = /[\$-/:-?}{-|~!;'&*+=<>,%"^#_@`\[\]]/g;
    const letters = /[a-zA-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = symbolRegex.test(password);

    if (whitespaceRegExp.test(password)) {
      this.infoMessage = 'Whitespaces are not allowed';
      // this.setBarColors(3, this.colors[1]);
      return 0;
    }
    if (password.length < 5) {
      this.infoMessage = 'Password shoild contain at least 5 symbols';
      return 0;
    }
    let force = 0;
    let strengthLevel = 0;
    const levels = [letters, numbers, symbols];

    for (const level of levels) {
      strengthLevel += level === true ? 1 : 0;
    }
    console.log('strengthLevel', strengthLevel);
    return strengthLevel;
    // 5
    // force += 2 * password.length + (password.length >= 5 ? 1 : 0);
    // force += strengthLevel * 10;
    // // 6
    // force = password.length <= 6 ? Math.min(force, 10) : force;
    // // 7
    // force = strengthLevel === 1 ? Math.min(force, 10) : force;
    // force = strengthLevel === 2 ? Math.min(force, 20) : force;
    // force = strengthLevel === 3 ? Math.min(force, 30) : force;
    // force = strengthLevel === 4 ? Math.min(force, 40) : force;
    // console.log('force', force);
    // return force;
  }

  private getColor(s: number) {
    let index;
    if (s <= 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: 3 - index,
      color: this.colors[index + 1],
    };
  }

  private setBarColors(count: number, color: string) {
    for (let n = 0; n < count; n++) {
      (this as any)['bar' + n] = color;
    }
  }
}
