import { TestBed } from '@angular/core/testing';
import { CharacterView } from './eg21';
import { SIGNAL } from '@angular/core/primitives/signals';
import { InputSignal } from '@angular/core';

describe(CharacterView.name, () => {
  it('test input set - createComponent', () => {
    TestBed.configureTestingModule({
      imports: [CharacterView],
    });
    const component = TestBed.createComponent(CharacterView);
    component.componentRef.setInput('name', 'Severus');

    expect(component.componentInstance.name()).toBe('Severus');
  });

  it('test input set - inject', () => {
    TestBed.configureTestingModule({
      providers: [CharacterView],
    });
    const component = TestBed.inject(CharacterView);

    setValueOfInputSignal(component.name, 'Severus');

    expect(component.name()).toBe('Severus');
  });
});

function setValueOfInputSignal<T>(signal: InputSignal<T>, value: T) {
  const node = signal[SIGNAL];
  node.applyValueToInputSignal(node, value);
}
