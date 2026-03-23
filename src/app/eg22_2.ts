import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  contentChildren,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-eg22_2_child',
  template: `
    <div #v1>ViewChild</div>
    @for (i of viewChildrens(); track $index) {
      <div #v2>ViewChildren</div>
    }

    <br /><br />
    <button (click)="addViewChildren()">Add View Children</button>

    <br />
    <hr />

    <br /><br />
    {{ vChild() != null ? 'there is view child' : 'no view child' }}<br />
    View Children count: {{ vChildren().length }}<br />
    {{ cChild() != null ? 'there is content child' : 'no content child' }}<br />
    Content Children count: {{ cChildren().length }}<br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg22_2_Child {
  viewChildrens = signal<number[]>([]);

  vChild = viewChild('v1');
  vChildren = viewChildren('v2');
  cChild = contentChild('c1');
  cChildren = contentChildren('c2');

  addViewChildren(): void {
    this.viewChildrens.update((x) => [...x, 1]);
  }
}

@Component({
  selector: 'app-eg22_2',
  imports: [Eg22_2_Child],
  template: `
    <h2>Example 22_2</h2>
    <p style="color: #777">viewChild, contentChild, viewChildren, contentChildren</p>

    <app-eg22_2_child>
      <div #c1>ContentChild</div>
      @for (i of contentChildrens(); track $index) {
        <div #c2>ContentChildren</div>
      }
    </app-eg22_2_child>

    <br /><br />
    <button (click)="addContentChildren()">Add Content Children</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg22_2 {
  contentChildrens = signal<number[]>([]);

  addContentChildren(): void {
    this.contentChildrens.update((x) => [...x, 1]);
  }
}
