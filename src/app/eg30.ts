import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { debounce, form, FormField, required } from '@angular/forms/signals';

interface Character {
  name: string;
  surname: string;
}

@Component({
  selector: 'app-eg30',
  imports: [FormField],
  template: `
    <h2>Example 30</h2>
    <p style="color: #777">signal forms</p>

    <input type="name" [formField]="loginForm.name" />
    <input type="surname" [formField]="loginForm.surname" />
    @if (loginForm.surname().touched() && loginForm.surname().invalid()) {
      <ul class="error-list">
        @for (error of loginForm.surname().errors(); track error) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }

    <div>
      {{ loginForm.name().value() }}
      {{ loginForm.surname().value() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg30 {
  loginModel = signal<Character>({
    name: '',
    surname: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    debounce(schemaPath.name, 500);
    required(schemaPath.surname, { message: 'Surname is required' });
  });
}
