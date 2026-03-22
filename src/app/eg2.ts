import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-eg2',
  imports: [],
  template: `
    <h2>Example 2</h2>
    <p style="color: #777">signal.update - updates signal based on current value (cannot mutate)</p>

    My name is {{ character().name }}<br /><br />
    <button (click)="changeName()">Change name</button>
  `,
})
export class Eg2 {
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
