import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-eg14',
  imports: [],
  template: `
    <h2>Example 14</h2>
    <p style="color: #777">computed - can set equal to determine if computed was changed</p>

    With equal: {{ characterNameWithEqual() }}<br /><br />
    Without equal: {{ characterName() }}<br /><br />

    <button (click)="changeToLowerCase()">Change to Lower Case</button>
    <button (click)="changeToUpperCase()">Change to Upper Case</button>
    <button (click)="changeName()">Change Name</button>
  `,
})
export class Eg14 {
  name = signal('James');

  characterName = computed(() => `My name is ${this.name()}`);
  characterNameWithEqual = computed(() => `My name is ${this.name()}`, {
    equal: (a, b) => a.toLocaleLowerCase() === b.toLocaleLowerCase(),
  });

  changeToLowerCase(): void {
    this.name.update((x) => x.toLocaleLowerCase());
  }

  changeToUpperCase(): void {
    this.name.update((x) => x.toLocaleUpperCase());
  }

  changeName(): void {
    this.name.update((x) => (x.toLocaleLowerCase() === 'james' ? 'Harry' : 'James'));
  }
}
