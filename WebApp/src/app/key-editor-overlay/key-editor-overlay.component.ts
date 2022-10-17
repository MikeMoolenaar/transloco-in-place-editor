import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-editor-overlay',
  templateUrl: './key-editor-overlay.component.html',
  styleUrls: ['./key-editor-overlay.component.scss']
})
export class KeyEditorOverlayComponent implements OnInit {

  private _oldBackgroundColor: string = '';
  public elements: Array<IChangedElement> = [];
  constructor() { }

  ngOnInit(): void {
    let oldTarget: HTMLElement;
    let oldBackgroundColor: string;
    document.addEventListener('mousemove', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      console.log(target.nodeName);

      // Reset old target
      if (oldTarget) {
        oldTarget.style.backgroundColor = oldBackgroundColor;
        oldTarget = target;
      }

      // Check for valid element
      if (!target ||
        target.childElementCount > 0 ||
        !target.attributes.getNamedItem('data-transloco-key') ||
        target.nodeName.toLowerCase() === 'input') {
        document.body.style.cursor = '';
        return;
      }
      document.body.style.cursor = 'pointer';

      // Change target
      oldBackgroundColor = target.style.backgroundColor;
      target.style.backgroundColor = 'rgba(175,0,0,0.18)'
      oldTarget = target;
    });

    let oldInput: HTMLElement;
    let oldClickTarget: HTMLElement;
    let oldParentNode: HTMLElement;
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;
      if (event.stopPropagation) event.stopPropagation();
      if (event.preventDefault) event.preventDefault();

      const translocoKey: string|undefined = target.attributes.getNamedItem('data-transloco-key')?.value;
      if (translocoKey) {
        if (oldInput && oldClickTarget && oldParentNode && oldParentNode.contains(oldInput)) {
          oldParentNode?.replaceChild(oldClickTarget, oldInput);
        }
        const parentNode = target.parentNode as HTMLElement;
        const input = document.createElement('input');
        input.value = target.innerText;
        input.style.border = '0';
        input.style.display = 'block';
        input.style.backgroundColor = 'white';
        input.addEventListener('keyup', (event: KeyboardEvent) => {
          console.log(event.key);
          if (event.key === 'Enter') {
            let textOld = target.innerText;
            target.innerText = input.value;
            parentNode.replaceChild(target, input);
            this.elements.push({
              targetElement: target,
              textOld,
              textNew: target.innerText,
              translocoKey: translocoKey
            })
          } else if (event.key === 'Escape') {
            parentNode.replaceChild(target, input);
          }
        });

        parentNode.replaceChild(input, target);
        input.focus();

        oldInput = input;
        oldClickTarget = target;
        oldParentNode = parentNode;
      } else {
        // Target does not contain a 'data-transloco-key' attribute
      }
    });
  }

  public mouseEnter(element: IChangedElement): void {
    this._oldBackgroundColor = element.targetElement.style.backgroundColor;
    element.targetElement.style.backgroundColor = 'rgba(175,0,0,0.10)';
  }

  public mouseLeave(element: IChangedElement): void {
    element.targetElement.style.backgroundColor = this._oldBackgroundColor;
  }

  public revert(element: IChangedElement): void {
    element.targetElement.innerText = element.textOld;
    element.targetElement.style.backgroundColor = this._oldBackgroundColor;
    this.elements.splice(this.elements.indexOf(element),1);
  }
}

export interface IChangedElement {
  targetElement: HTMLElement;
  textOld: string;
  textNew: string;
  translocoKey: string;
}
