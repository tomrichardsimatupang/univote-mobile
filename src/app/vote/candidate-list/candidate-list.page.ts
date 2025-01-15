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
export class CandidateListPage extends BaseComponent {

  candidates: Array<Candidate>;
  candidateSelectedList: Array<Candidate>;
  category: string;
  deviceId: string;
  categories: Array<any>;
  nextCategory: string | null = null;
  checksums: Array<any> = [];
  images = new Map<string, string>();
  loading = true;
  isVotingFinished = false;

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
    this.candidateSelectedList = [];
  }

  ionViewWillEnter() {
    this.nextCategory = null;
    this.hardwareService.getPermission().then(
      (deviceId:string) => {
        this.deviceId = deviceId;
        this.fetchCandidates();
      }).catch((e: any) => {
        this.popupService.permissionDenied();
      });
  }

  navigateTo(item: any) {
    this.storageService.setSession('candidate-view', item);
    this.navCtrl.navigateForward("/vote/candidate-detail");
  }

  navigateBack() {
    this.navCtrl.navigateForward("/app");
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
      this.isVotingFinished = response.isVotingFinished;
      this.fetchImages().subscribe(() => {
        this.categories = response.categoryList;
        if(this.categories.length > 0) {
          this.submitNextCategory();
        }
        this.loading = false;
      });
    });
  }

  private submitNextCategory() {

    if(this.isVotingFinished) {

      this.candidateSelectedList = this.categories.map(item => {

        const candidate = (item.candidateList.find((candidate: any) => {
          return candidate.candidate_id === item.candidateSelected
        }));

        return {
          ...candidate,
          photo: this.images.get(candidate.photo_checksum) || ''
        }

      });

      this.categories = [];
      this.category = "Calon Pilihan"

      return;
    }

    let currentCategory: any = null;
    if(this.nextCategory === null) {
      currentCategory = this.categories.find(category =>
        category.candidateSelected === null
      );
    } else {
      currentCategory = this.copyValue(this.nextCategory);
    }

    if(currentCategory) {
      this.candidates = currentCategory.candidateList as Array<Candidate>;
      this.candidates = this.candidates.map(item => ({
        ...item,
        photo: this.images.get(item.photo_checksum) || ''
      }));
      this.category = currentCategory.categoryName;
      this.nextCategory = this.categories.find(category =>
        category.candidateSelected === null && category.categoryId !== currentCategory.categoryId
      );
    }else {
      this.categories = [];
    }

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
  category_id: string,
  photo: string,
  category_name?: string
}



