import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../@services/storage/storage.service';
import { MobileService } from '../../@services/http/mobile.service';
import { HardwareService } from '@app/@services/hardware/hardware.service';

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

  candidate: any;

  constructor(
    private readonly navCtrl: NavController,
    private readonly mobileService: MobileService,
    private readonly storageService: StorageService,
    private readonly hardwareService: HardwareService,
  ) {
    super();
    this.candidate = null;
    this.hardwareService.getPermission();
  }

  ngOnInit() {
    this.candidate = this.storageService.getSession('candidate-view');
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

      const payload = {
        ...this.candidate,
        device_id: this.hardwareService.deviceId
      }

      this.mobileService.postVoteCandidateVoting(payload)
        .subscribe((response) => {
          this.navCtrl.navigateRoot("/vote/candidate-list");
        });

    }

  }

}
