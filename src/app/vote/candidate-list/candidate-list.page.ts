import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { NavController } from '@ionic/angular';
import { HardwareService } from '../../@services/hardware/hardware.service';
import { PopupService } from '../../@services/popup/popup.service';
import { MobileService } from '../../@services/http/mobile.service';
import { StorageService } from '@app/@services/storage/storage.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage extends BaseComponent implements OnInit {

  candidates: Array<Candidate>;
  category: string;
  deviceId: string;
  categories: Array<any>;
  nextCategory: string | null = null;
  checksums: Array<any> = [];
  images = new Map<string, string>();
  loading = true;

  constructor(
    private readonly navCtrl: NavController,
    private readonly hardwareService: HardwareService,
    private readonly popupService: PopupService,
    private readonly storageService: StorageService,
    private readonly mobileService: MobileService
  ) {
    super();
    this.deviceId = "";
    this.category = "";
    this.candidates = [];
    this.categories = [];
  }

  ngOnInit() {

    this.hardwareService.getPermission().then(
      (deviceId:string) => {
        this.deviceId = deviceId;
        this.fetchCandidates();
      }).catch((e: any) => {
        this.popupService.permissionDenied();
      });
  }

  navigateTo(item: any) {
    this.navCtrl.navigateForward("/vote/candidate-detail");
  }

  refresh(event: any) {
    const imageRemove = this.checksums.map(item => item.checksum);
    this.storageService.removeCacheImages(imageRemove);
    this.fetchImages().subscribe(() => {
      event.target.complete();
    });
  }

  private fetchImages(): Observable<any> {

    return new Observable((subscriber) => {

      const checksums = this.checksums.map(item => item.checksum);
      const missingChecksum = this.storageService.getMissingImages(checksums);
      if(missingChecksum.length > 0) {
        const loadImage = this.checksums.filter( item => missingChecksum.includes(item.checksum) );
        const loadPhoto = loadImage.map((item) => (
          this.mobileService.getCandidatePhoto(item.download)
        ));
        forkJoin(loadPhoto).subscribe((files: Array<Promise<any>>) => {
          const savedPhoto: Array<{checksum: string,content: string}> = [];
          files.forEach((file, index) => {
            file.then(content => {
              savedPhoto.push({
                checksum: loadImage[index].checksum,
                content: content as string
              });
              if(savedPhoto.length >= loadImage.length) {
                this.storageService.updateCacheImages(savedPhoto);
                const images = this.storageService.getCacheImage(checksums);
                images.forEach(item => {
                  this.images.set(item.checksum, item.content);
                });
                subscriber.next();
                subscriber.complete();
              }
            })
          });
        });
      } else {
        const images = this.storageService.getCacheImage(checksums);
        images.forEach(item => {
          this.images.set(item.checksum, item.content);
        });
        subscriber.next();
        subscriber.complete();
      }

    });

  }

  private fetchCandidates() {
    this.loading = true;
    this.mobileService.getCandidateList().subscribe((response: any) => {
      this.checksums = response.checksum;
      this.fetchImages().subscribe(() => {
        this.categories = response.categoryList;
        this.submitNextCategory();
        this.loading = false;
      });
    });
  }

  private submitNextCategory() {
    let currentCategory: any = null;
    if(this.nextCategory === null) {
      currentCategory = this.categories.find(category =>
        category.candidateSelected === null
      );
    } else {
      currentCategory = this.copyValue(this.nextCategory);
    }
    this.candidates = currentCategory.candidateList as Array<Candidate>;
    this.category = currentCategory.categoryName;
    this.nextCategory = this.categories.find(category =>
      category.candidateSelected === null && category.categoryId !== currentCategory.categoryId
    );
  }

  private copyValue(value: any) {
    return JSON.parse(JSON.stringify(value));
  }

}

interface Candidate {
  candidate_id: string,
  candidate_name: string,
  candidate_number: number,
  candidate_photo: string,
  photo_checksum: string,
  category_id: string
}



