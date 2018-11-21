import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    exports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class MyOwnCustomMaterialModule { }
