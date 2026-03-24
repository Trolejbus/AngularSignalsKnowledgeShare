import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-Eg3',
  imports: [],
  template: `
    <h3>Example 3</h3>
    <p style="color: #777">signal.update - updates signal based on current value (cannot mutate)</p>

    My name is {{ character().name }}<br /><br />
    <button (click)="changeName()">Change name</button>
  `,
})
export class Eg3 {
  character = signal({
    name: 'Bond',
    age: 35,
  });

  changeName(): void {
    this.character.update((x) => ({
      ...x,
      name: 'James Bond',
    }));
  }
}
