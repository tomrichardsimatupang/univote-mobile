import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.page.html',
  styleUrls: ['./candidate-detail.page.scss'],
})
export class CandidateDetailPage extends BaseComponent implements OnInit {

  category = "BEM Esa Unggul";
  description = "Setelah konfirmasi tidak dapat kembali. Apakah yakin memilih calon tersebut ?";

  public isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Ya, Konfirm',
      data: {
        action: 'confirm',
      },
    },
    {
      text: 'Batal',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    private readonly navCtrl: NavController
  ) {
    super();
  }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("/vote/candidate-list");
  }

  openConfirm() {
    this.isActionSheetOpen = true;
  }

  postVote(event: any) {

    this.isActionSheetOpen = false;

    const detail = event.detail;

    if(detail?.data?.action === "confirm") {
      this.navCtrl.navigateRoot("/vote/candidate-list");
    }

  }

}
