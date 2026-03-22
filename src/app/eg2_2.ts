import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-eg2_2',
  imports: [],
  template: `
    <h2>Example 2.2</h2>
    <p style="color: #777">
      signal.asReadonly() - introduce wrapper to prevent from changing signal
    </p>

    My name is {{ character().name }}<br /><br />
    <button (click)="changeName()">Change Name</button>
  `,
})
export class Eg2_2 {
  private _character = signal({
    name: 'Bond',
    age: 35,
  });
  character = this._character.asReadonly();

  changeName(): void {
    this._character.update((x) => ({
      ...x,
      name: 'James Bond',
    }));
  }
}
