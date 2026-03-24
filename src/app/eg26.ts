import { ChangeDetectionStrategy, Component, DoCheck, input, signal } from '@angular/core';

@Component({
  selector: 'character-view',
  template: `
    Name: {{ name() }}<br />
    Surname: {{ surname() }}<br />
    Email: {{ email() }}<br />
    Tags: {{ tags() }}<br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterView implements DoCheck {
  name = input.required<string>();
  surname = input<string>('-');
  email = input<string>('-', {
    alias: 'mail',
    // Better not to use
  });
  tags = input<string, string[]>('', {
    transform: (value: string[]) => value.join(','),
    // Usefull for directives parameters etc
  });

  ngDoCheck(): void {
    console.log('Child check');
  }
}

@Component({
  selector: 'app-eg26',
  imports: [CharacterView],
  template: `
    <h2>Example 21</h2>
    <p style="color: #777">input</p>

    <character-view
      [name]="character().name"
      [surname]="character().surname"
      [mail]="character().mail"
      [tags]="character().tags"
    ></character-view>
    <br /><br />
    <button (click)="updateCharacter()">Update Character</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg26 {
  character = signal({
    name: 'James',
    surname: 'Bond',
    mail: 'james.bond@mi-6.org',
    tags: ['top', 'secret'],
  });

  updateCharacter(): void {
    this.character.set({
      name: 'Severus',
      surname: 'Snape',
      mail: 'severus.snape@hogward.edu',
      tags: ['hate', 'Potter'],
    });
  }
}
