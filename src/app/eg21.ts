import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'rxjs-calculation',
  imports: [JsonPipe, AsyncPipe],
  template: `
    {{ charactersTags$ | async | json }} Count: {{ charactersTagsCount$ | async }} <br /><br />
    <button (click)="addCharacter()">Add character</button>
  `,
})
export class RxjsCalculation {
  characters$ = new BehaviorSubject<{ id: number; tagId: number }[]>([
    {
      id: 1,
      tagId: 1,
    },
  ]);

  tags$ = new BehaviorSubject<{ tagId: number; name: string }[]>([
    {
      tagId: 1,
      name: 'Tag 1',
    },
  ]);

  charactersTags$ = combineLatest([this.characters$, this.tags$]).pipe(
    tap((x) => console.log('combineLatest calculated')),
    map(([characters, tags]) =>
      characters.map((c) => ({
        id: c.id,
        name: tags.find((t) => t.tagId === c.tagId)!.name,
      })),
    ),
    shareReplay(),
  );

  charactersTagsCount$ = this.charactersTags$.pipe(map((x) => x.length));

  addCharacter(): void {
    this.characters$.next([
      ...this.characters$.value,
      {
        id: this.characters$.value.length + 1,
        tagId: 1,
      },
    ]);
  }
}

@Component({
  selector: 'signals-calculation',
  imports: [JsonPipe],
  template: `
    {{ charactersTags() | json }} Count: {{ charactersTagsCount() }} <br /><br />
    <button (click)="addCharacter()">Add character</button>
  `,
})
export class SignalsCalculation {
  characters = signal<{ id: number; tagId: number }[]>([
    {
      id: 1,
      tagId: 1,
    },
  ]);

  tags = signal<{ tagId: number; name: string }[]>([
    {
      tagId: 1,
      name: 'Tag 1',
    },
  ]);

  charactersTags = computed(() => {
    console.log('computed calculated');
    return this.characters().map((c) => ({
      id: c.id,
      name: this.tags().find((t) => t.tagId === c.tagId)!.name,
    }));
  });

  charactersTagsCount = computed(() => this.charactersTags().length);

  addCharacter(): void {
    this.characters.update((x) => [
      ...x,
      {
        id: this.characters().length + 1,
        tagId: 1,
      },
    ]);
  }
}

@Component({
  selector: 'app-eg21',
  imports: [RxjsCalculation, SignalsCalculation],
  template: `
    <h2>Example 21</h2>
    <p style="color: #777">Difference between rxjs and signals in calculation</p>
    <h2>Rxjs</h2>
    <rxjs-calculation></rxjs-calculation>
    <br /><br />
    <h2>Signals</h2>
    <signals-calculation></signals-calculation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg21 {
  constructor() {}
}
