import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import {IListItem} from '../../interfaces/IListItem.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent implements AfterViewInit {
  #cdr = inject(ChangeDetectorRef)
  @ViewChild('inputText') public inputText !: ElementRef;
  @Input({required: true}) inputListItems: IListItem[] = [];
  @Output() public outPutAddListItem = new EventEmitter<IListItem>();

  ngAfterViewInit(): void {
    this.inputText.nativeElement.focus()
  }

  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = "";
      const id: string = this.genID();
      const objOutput = {id,checked: false, value}

      this.outPutAddListItem.emit(objOutput);
    }

    return this.inputText.nativeElement.focus()
  }

  private genID(): string{
    const dataAtual = new Date();
    const timestamp = dataAtual.getTime();
    const id = `ID ${timestamp}`;

    return id
  }
}