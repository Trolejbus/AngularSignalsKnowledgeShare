import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'character-view',
  template: `
    <button (click)="buttonClicked()">Remove</button><br /><br />
    {{ counter() }} <button (click)="increment()">+1</button><br /><br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterView {
  counter = signal(0);

  removeClicked = output<void>();
  counterUpdated = output<number>();
  likeClickedOutput = output<number>({
    alias: 'likeClicked',
  });

  private obs$ = new BehaviorSubject(0);
  obs = outputFromObservable(this.obs$);
  obs2$ = outputToObservable(this.obs);

  buttonClicked(): void {
    this.removeClicked.emit();
  }

  increment(): void {
    this.counter.update((x) => x + 1);
    this.counterUpdated.emit(this.counter());
  }
}

@Component({
  selector: 'app-eg28',
  imports: [CharacterView],
  template: `
    <h2>Example 28</h2>
    <p style="color: #777">output</p>

    <character-view
      (removeClicked)="removeClicked()"
      (counterUpdated)="updateCounter($event)"
      (likeClicked)="likeClicked()"
    ></character-view>

    <br />
    <br />
    <hr />
    <br />

    @if (removed()) {
      (Removed) <br />
    }
    Counter: {{ counter() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg28 {
  removed = signal(false);
  counter = signal(0);

  removeClicked(): void {
    this.removed.set(true);
  }

  updateCounter(value: number): void {
    this.counter.set(value);
  }

  likeClicked(): void {}
}
