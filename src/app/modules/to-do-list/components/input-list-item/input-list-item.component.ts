import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItem } from '../../interfaces/IListItem.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({required: true}) inputListItems: IListItem[] = [];
  @Output() outPutCheck = new EventEmitter<{id: string, checked: boolean}>()
  @Output() outPutText = new EventEmitter<{id: string, value: string}>()
  @Output() deletarItem = new EventEmitter<string>()

  updateCheck(id: string, checked: boolean){
    return this.outPutCheck.emit({id, checked})
  }

  updateText(id:string, value:string) {
    return this.outPutText.emit({id, value})
  }

  deleteItem(id:string){
    return this.deletarItem.emit(id)
  }
}