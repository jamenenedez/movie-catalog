import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class MyOwnCustomMaterialModule { }
