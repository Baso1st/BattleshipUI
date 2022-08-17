import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogParams } from 'src/app/models/dialog-params';

@Component({
    selector: 'app-dialog-content',
    templateUrl: './dialog-content.component.html',
    styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogParams) { }

    ngOnInit(): void {
    }

}
