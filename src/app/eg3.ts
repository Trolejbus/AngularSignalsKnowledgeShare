import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-eg3',
  imports: [],
  template: `
    <h2>Example 3</h2>
    <p style="color: #777">computed - computes values based on other signals</p>

    {{ characterName() }}<br /><br />
    <button (click)="changeName()">Change Name</button>
  `,
})
export class Eg3 {
  fullName = signal('Bond');

  characterName = computed(() => `My name is ${this.fullName()}`);

  changeName(): void {
    this.fullName.set('James Bond');
  }
}
