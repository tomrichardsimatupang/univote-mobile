import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/@core/base/base.component';
import { DocumentumService } from '@app/@services/http/documentum.service';
import { MobileService } from '@app/@services/http/mobile.service';
import { NavController } from '@ionic/angular';

interface Candidate {
  candidate_id: string,
  candidate_name: string,
  candidate_number: number,
  candidate_photo: string,
  category_name: string,
  count_total: number,
  count_result: number
}

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage extends BaseComponent {

  candidates: Array<Candidate> = [];
  categoryName = "";

  constructor(
    private route: ActivatedRoute,
    private readonly navCtrl: NavController,
    private readonly mobileService: MobileService,
    private readonly documentumService: DocumentumService
  ) {
    super();
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe((params:any) => {
      const category_id = params.get('id');
      this.fetchReportDetail(category_id);
    });
  }

  fetchReportDetail(category_id: string) {
    this.mobileService.getVoteReporDetail({
      category_id
    }).subscribe({
      next: async (response) => {
        this.candidates = await Promise.all(
          response.map(async (candidate: Candidate) => {
            this.categoryName = candidate.category_name;
            const candidate_photo = await this.fetchPhoto(candidate.candidate_photo);
            return {
              ...candidate,
              candidate_photo
            }
          })
        )
      }
    })
  }

  fetchPhoto(candidate_photo: string) {
    return new Promise<any>((resolve, reject) => {
      this.documentumService.getPhotoCandidate(candidate_photo).subscribe({
        next: (file: FileReader) => {
          file.onload = () => {
            resolve(file.result);
          }
        },
        error: (err) => reject(err)
      });
    });
  }

  percentage(candidate: Candidate) {
    const result = ((candidate.count_result / candidate.count_total) * 100).toFixed(2);
    return candidate.count_result > 0 ? result : 0;
  }

}
