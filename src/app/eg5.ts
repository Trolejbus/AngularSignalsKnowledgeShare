import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-eg5',
  imports: [],
  template: `
    <h2>Example 5</h2>
    <p style="color: #777">computed - Problems with mutation</p>

    My name is {{ character().name }}<br /><br />
    {{ characterName() }}<br /><br />
    <button (click)="changeName()">Change name (mutate)</button>
  `,
})
export class Eg5 {
  character = signal({
    name: 'Bond',
    age: 35,
  });

  characterName = computed(() => `My name is ${this.character().name}`);

  changeName(): void {
    this.character.update((x) => {
      x.name = 'James Bond';
      return x;
    });
  }
}
