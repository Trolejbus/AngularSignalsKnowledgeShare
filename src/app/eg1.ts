import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-eg1',
  imports: [],
  template: `
    <h2>Example 1</h2>
    <p style="color: #777">signal.set - set value</p>

    My name is {{ fullName() }}<br /><br />
    <button (click)="changeName()">Change Name</button>
  `,
})
export class Eg1 {
  fullName = signal('Bond');

  changeName(): void {
    this.fullName.set('James Bond');
  }
}
