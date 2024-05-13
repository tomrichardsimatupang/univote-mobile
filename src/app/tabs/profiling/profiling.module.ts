import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilingPageRoutingModule } from './profiling-routing.module';

import { ProfilingPage } from './profiling.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilingPageRoutingModule
  ],
  declarations: [ProfilingPage]
})
export class ProfilingPageModule {}
