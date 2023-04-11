import {Component, OnInit} from '@angular/core';
import {MusicService} from "../../../service/music.service";
import {environment} from "../../../../environments/environment";
import {StreamState} from "../../../models/playlist-types";
import {AudioService} from "../../../service/audio.service";

@Component({
  selector: 'td-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})
export class PlayerBarComponent implements OnInit {

  public baseUrl = environment.baseUrl;
  public volume: number = 50;

  public timeElapsed: number = 0;
  public timeDuration: number = 0;
  public timeProgress: number = 0;

  public musicInfo: any;
  public musicContent: any;
  // public audio: HTMLAudioElement = new Audio();

  public isStop: boolean = true;

  files: Array<any> = [];
  state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };
  currentFile: any = {};

  constructor(
    private musicService: MusicService,
    private audioService: AudioService,
  ) {
  }

  ngOnInit() {
    this.musicService.songInfo$.subscribe({
      next: data => {
        if (data) {
          this.musicInfo = data;
          data.url = this.baseUrl + '/songs/' + data?.id + '.mp3';
          this.openFile(data);
          // this.getMusicById(data?.id);
        }
      }
    });

    this.audioService.getState().subscribe(state => {
      this.state = state;
      console.log(this.state);
      debugger;
    });


    // this.audio.addEventListener('timeupdate', (ev: any) => {
    //   console.log(ev);
    //   debugger;
    // });
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file: any, index: any = null) {
    // this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  playerActions(type: 'stop' | 'play' | 'pause') {
    switch (type) {
      case 'play':
        this.audioService.play();
        break;
      case 'pause':
        this.audioService.pause();
        break;
      case 'stop':
        this.audioService.stop();
        break;
    }
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onVolumeChange(value: any) {
    if (value?.target) {
      this.volume = Number(value?.target?.value);
      const el = document.getElementById('playerVolume');
      if (el) {
        el.style.background = `linear-gradient(to right, #fff 0%, #fff ${this.volume}%, hsla(0,0%,100%,.3) ${this.volume}%, hsla(0,0%,100%,.3) 100%)`;
      }
    }
  }

  onSliderChangeEnd(value: any) {
    if (value?.target) {
      this.timeProgress = Number(value?.target?.value);
      this.audioService.seekTo(value?.target?.value);
      const el = document.getElementById('playerProgressBar');
      if (el) {
        el.style.background = `linear-gradient(to right, #fff 0%, #fff ${this.timeProgress}%, hsla(0,0%,100%,.3) ${this.timeProgress}%, hsla(0,0%,100%,.3) 100%)`;
      }
    }
  }
}
