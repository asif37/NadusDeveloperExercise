import { Component, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'app-delete-conformation',
    templateUrl: './delete-conformation.html',
    styleUrls: ['./delete-conformation.scss']
})
export class deleteConformation {
    @Output() emitter: EventEmitter<any>;
    data: Data;
    constructor() {
        this.data = new Data();
        this.emitter = new EventEmitter();
    }
    cancel() {
        this.emitter.emit(false);
    }
    delete() {
        this.emitter.emit(true);
    }
}
export class Data {
    text: string;
    title: string;
}