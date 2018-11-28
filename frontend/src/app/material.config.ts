import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
    ],
    exports: [
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
    ]
})
export class MyOwnCustomMaterialModule { }
