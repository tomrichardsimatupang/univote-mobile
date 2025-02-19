import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';
import { MobileService } from '../../@services/http/mobile.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export interface Post {
  title: string,
  image: string,
  imageContent: string | ArrayBuffer | null,
  body: string,
  author: string,
  postDate: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends BaseComponent {

  loading = true;
  posts: Array<Post>;

  constructor(
    private readonly mobileService: MobileService,
    private http: HttpClient
  ) {
    super();
    this.posts = [];
  }

  ionViewWillEnter() {

    const lastPostUpdates = sessionStorage.getItem('dashboardPosts');

    if(lastPostUpdates) {
      this.posts = JSON.parse(lastPostUpdates);
      this.buildPost();
      this.loading = false;
    }else {
      this.loading = true;
      this.mobileService.getContentPostList().subscribe({
        next: (response: Array<Post>) => {

          response = response.sort((a, b) => {
            return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
          });

          const caceImageLoad = new Array<Observable<any>>();

          response.forEach((post: Post) => {
            caceImageLoad.push(this.cacheImages(post));
          });

          forkJoin(caceImageLoad).subscribe((savedPost) => {
            this.posts = savedPost;
            sessionStorage.setItem('dashboardPosts', JSON.stringify(this.posts));
            this.buildPost();
          });
          this.loading = false;

        }
      })
    }

  }

  private buildPost() {
    this.posts = this.posts.map((item) => {
      return {
        ...item,
        postDate: moment.utc(item.postDate).fromNow()
      }
    });
  }

  private cacheImages(post: Post) {
    return new Observable((subscriber) => {
      this.http.get(post.image, {
        responseType: 'blob'
      }).subscribe((blob) => {
        const reader = new FileReader();
        reader.onloadend = function() {
          const base64data = reader.result;
          post.imageContent = base64data;
          subscriber.next(post);
          subscriber.complete();
        }
        reader.readAsDataURL(blob);
      });

    });
  }

}
