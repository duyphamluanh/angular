import { DropdownItem } from "../dropdown-button/DropdownItem";

export interface TodoItem extends DropdownItem{
    id: number,
    name: string,
    description: string,
    completed: boolean
}