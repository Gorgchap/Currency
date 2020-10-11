import {SelectionModel} from '@angular/cdk/collections';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Source} from '../../domain/currency';

@Component({
  selector: 'app-current-modal',
  templateUrl: './current-modal.component.html',
  styleUrls: ['./current-modal.component.css']
})
export class CurrentModalComponent {
  displayedColumns: string[] = ['select', 'url'];
  selection = new SelectionModel<Source>(true, []);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Source[],
              public dialogRef: MatDialogRef<CurrentModalComponent>) { }

  checkboxLabel(source?: Source): string {
    return source
      ? `${this.selection.isSelected(source) ? 'deselect' : 'select'} row ${source.id + 1}`
      : `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }

  isAllSelected = () => this.data.every(n => this.selection.selected.indexOf(n) > -1);

  isAnySelected = () => this.data.some(n => this.selection.selected.indexOf(n) > -1);

  masterToggle() {
    this.isAllSelected() ? this.selection.deselect(...this.data) : this.selection.select(...this.data);
  }

  save() {
    this.dialogRef.close(this.selection.selected);
  }
}
