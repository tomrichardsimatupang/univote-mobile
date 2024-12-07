import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { MobileService } from '@app/@services/http/mobile.service';
import { NavController } from '@ionic/angular';
import { AppModule } from "../../@component/component.module";
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';

interface Category {
  category_id: string;
  category_name: string;
  count_result: number;
}

interface ErrorResponse {
  code: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage extends BaseComponent {

  categories: Array<Category> = [];
  error: ErrorResponse | null = null;

  constructor(
    private readonly navCtrl: NavController,
    private readonly mobileService: MobileService,
  ) {
    super();
  }

  ionViewWillEnter() {
    this.fetchReportList();
  }

  fetchReportList() {
    this.mobileService.getVoteReportList(true).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error;
      }
    })
  }

  navigateDetail(category: Category) {
    this.navCtrl.navigateForward(`app/report-detail/${category.category_id}`);
  }

  back() {
    this.navCtrl.navigateRoot(`app/menu`);
  }

}
