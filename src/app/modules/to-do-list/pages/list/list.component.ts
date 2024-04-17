import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import {IListItem} from '../../interfaces/IListItem.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  addItem= signal(true);
  #localStorageKey = '@my-list'
  
  #setListItems = signal<IListItem[]>(this.#parseItems());
  getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem(this.#localStorageKey) || '[]')
  }

  getInputAndAddItem(value: IListItem) {
    localStorage.setItem(this.#localStorageKey, 
      JSON.stringify([...this.#setListItems(), value]))

    return this.#setListItems.set(this.#parseItems())
  }

  deleteAllItems(){
    Swal.fire({
      title: "Tem certeza?",
      text: "você está prestes a apagar toda a lista, essa ação não tem volta!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--red)",
      cancelButtonColor: "var(--primary-010)",
      confirmButtonText: "Sim, deletar tudo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "Lista deletada com sucesso.",
          icon: "success",
          confirmButtonColor: "var(--grey)"
        });
        localStorage.removeItem(this.#localStorageKey)
        return this.#setListItems.set(this.#parseItems())
      }
    });
    return    
  }

  listItemsStage(value: 'pending' | 'completed'){
    return this.getListItems().filter((res: IListItem) => {
      if (value === 'pending') {
        return !res.checked
      } else if (value === 'completed') {
        return res.checked
      }
      return res
    })
  }

  updateCheck(newItem: {id:string, checked:boolean}){
    this.#setListItems.update((oldValue: IListItem[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked
        }
        return res
      })
      return oldValue
    })
    return localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#setListItems()))
  }

  updateText(newItem: {id:string, value:string}){
    this.#setListItems.update((oldValue: IListItem[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value
        }
        return res
      })
      return oldValue
    })
    return localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#setListItems()))
  }

  deletarItem(id: string){
    this.#setListItems.update((oldValue: IListItem[]) => {
      return oldValue.filter((resp) => resp.id !== id)
    });
    return localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#setListItems()))
  }
}