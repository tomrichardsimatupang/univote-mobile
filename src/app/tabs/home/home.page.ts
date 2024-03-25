import { Component } from '@angular/core';
import { BaseComponent } from '@app/@core/base/base.component';

export interface Post {
  title: string,
  image: string,
  body: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends BaseComponent {

  posts: Array<Post>;

  constructor() {
    super();
    this.posts = [
      {
        title: "",
        image: "https://file.xdevpusaka.com/post1.jpg",
        body: "Here's a small text description..."
      },
      {
        title: "",
        image: "https://file.xdevpusaka.com/post2.jpg",
        body: "Here's a small text description..."
      }
    ];
  }

}
