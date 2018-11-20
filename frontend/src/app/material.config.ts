import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule
    ],
    exports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule
    ]
})
export class MyOwnCustomMaterialModule { }
