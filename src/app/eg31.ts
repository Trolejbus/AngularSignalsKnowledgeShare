import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-eg31',
  imports: [JsonPipe],
  template: `
    <h2>Example 31</h2>
    <p style="color: #777">devtools</p>

    <b>Characters: </b>{{ characters() | json }}<br />
    <b>Badges: </b>{{ characterBadges() | json }}<br />
    <b>James Bond: </b>{{ jamesBond() | json }}<br />
    <b>James Bond With Badges: </b>{{ jamesBondWithBadges() | json }}<br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg31 {
  characters = signal<
    {
      id: number;
      firstName: string;
    }[]
  >([
    {
      id: 1,
      firstName: 'James',
    },
    {
      id: 2,
      firstName: 'Severus',
    },
  ]);

  jamesBond = computed(() => this.characters().find((x) => x.firstName === 'James'));
  characterBadges = signal<{ badge: string; id: number }[]>([
    { badge: 'Top secret', id: 1 },
    { badge: 'Not secret', id: 2 },
  ]);
  jamesBondWithBadges = computed(() =>
    this.characterBadges().find((x) => x.id === this.jamesBond()?.id),
  );

  constructor() {
    effect(() => {
      console.log(this.jamesBondWithBadges());
    });
  }
}
