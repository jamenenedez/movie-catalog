import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule
    ],
    exports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule
    ]
})
export class MyOwnCustomMaterialModule { }
