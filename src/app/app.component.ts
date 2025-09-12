import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
