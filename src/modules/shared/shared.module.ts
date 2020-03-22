import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent, ConfirmDialogDirective} from 'src/modules/shared/components/confirmDialog/confirmDialog.directive';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material';


@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule
	],
	declarations: [
		ConfirmDialogComponent,
		ConfirmDialogDirective
	],
	exports: [
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		ConfirmDialogComponent,
		ConfirmDialogDirective,
		MatButtonModule
	]
})
export class SharedModule {
}
