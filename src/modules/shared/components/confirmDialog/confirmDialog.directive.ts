import { Component, Directive, EventEmitter, HostListener, Inject, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfirmDialogConfig } from 'src/modules/shared/confirmDialog/model';

@Directive({
	selector: '[aliConfirmDialog],aliConfirmDialog'
})
export class ConfirmDialogDirective implements OnChanges, OnDestroy {
	@Output()
	confirmAction: EventEmitter<void> = new EventEmitter();

	@Output()
	cancelAction: EventEmitter<void> = new EventEmitter();

	@Input('aliConfirmDialog')
	config: any; // Keep any - string 'aliConfirmDialog' will be bound if no custom config is given

	private subscriptions: Subscription[] = [];

	constructor(private dialog: MatDialog) {
	}

	ngOnChanges(): void {
		if (this.config === 'aliConfirmDialog' || this.config === '') {
			this.config = new ConfirmDialogConfig();
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub: Subscription) => {
			sub.unsubscribe();
		});
	}

	@HostListener('click')
	onClick(): void {
		if (this.config && this.config.shouldOpen === false) {
			return;
		}
		this.openDialog();
	}

	openDialog(): any {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: this.config
		});
		this.setCloseHandler(dialogRef);
	}

	private setCloseHandler(dialogRef: MatDialogRef<ConfirmDialogComponent>): void {
		const closeSub = dialogRef.afterClosed().subscribe((result: any) => {
			if (result === 'true') {
				this.config.shouldOpen = false;
				this.confirmAction.emit();
			} else {
				this.cancelAction.emit();
			}
		});
		this.subscriptions.push(closeSub);
	}
}

@Component({
	selector: 'ali-confirm-dialog',
	templateUrl: './confirm.dialog.component.pug',
	styleUrls: ['./confirm.dialog.component.sass']
})
export class ConfirmDialogComponent {

	constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public config: ConfirmDialogConfig) {
	}

	@HostListener('document:keyup', ['$event'])
	keyup(event: KeyboardEvent): void {
		switch (event.key) {
			case 'Escape': {
				this.dialogRef.close('false');
				break;
			}
			case 'Enter': {
				this.dialogRef.close('true');
				break;
			}
		}
	}
}
