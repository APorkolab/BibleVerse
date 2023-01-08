import { Component, ViewChild, } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bibleverse';
  @ViewChild('bgVideo') bgVideo!: HTMLVideoElement;

  ngOnInit() {
    console.log(this.bgVideo);
  }

  toggleVideo(vid: HTMLMediaElement) {
    if (vid.paused == true) {
      vid.play();
    } else {
      vid.pause();
    }
  }
}
