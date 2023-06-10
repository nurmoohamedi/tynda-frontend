import {Component, OnInit} from '@angular/core';
import {MusicService} from "../../../service/music.service";
import {environment} from "../../../../environments/environment";
import {StreamState} from "../../../models/playlist-types";
import {AudioService} from "../../../service/audio.service";
import {calculatePlayerPercentage} from "../../../core/helpers";

@Component({
  selector: 'td-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.scss']
})
export class PlayerBarComponent implements OnInit {

  public baseUrl = environment.baseUrl;

  public volume = 50;
  isVolumeMuted = false;
  valueBeforeMuted = 0;

  public musicInfo: any;

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

  public showPlayerBar: boolean = false;

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
          // data.url = this.baseUrl + '/songs/' + data?.id + '.mp3';
          // data.url = 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/70/9f/c7/709fc7e3-8e43-4b42-4f6e-c9f0a94842ce/mzaf_8187227090010990098.plus.aac.ep.m4a';

          if (!data.url) {
            // data.url = this.baseUrl + '/songs/' + data?.id + '.mp3';
          }

          this.openFile(data);
          this.showPlayerBar = true;
        }
      }
    });
    this.audioService.getState().subscribe(state => {
      this.state = state;
      if (state?.currentTime && state?.duration) {
        const sliderPercentage = calculatePlayerPercentage(state?.currentTime, state?.duration);
        this.setSliderPercentage(sliderPercentage, 'playerProgressBar');
      }
    });
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file: any, index: any = null) {
    // this.currentFile = { index, file };
    this.audioService.stop();
    if (file?.preview_link) {
      this.playStream(file.preview_link);
    } else {
      this.playStream(file.url);
    }
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
      const calc = this.volume / 100;
      this.audioService.setVolume(calc);
      this.setSliderPercentage(this.volume, 'playerVolume');
    }
  }

  unmuteVolume() {
    let mutedValue = 0;
    if (this.isVolumeMuted) {
      mutedValue = this.valueBeforeMuted;
    } else {
      mutedValue = 0;
      this.valueBeforeMuted = this.volume;
    }
    this.onVolumeChange({ target: { value: mutedValue } });
    this.isVolumeMuted = !this.isVolumeMuted;
  }

  onSliderChangeEnd(value: any) {
    const allValue = this.state?.duration;
    let percentage = 0;

    if (value?.target?.value) {
      const currValue = Number(value?.target?.value);
      if (allValue) {
        percentage = calculatePlayerPercentage(currValue, allValue);
      }
      this.audioService.seekTo(value?.target?.value);
      this.setSliderPercentage(percentage, 'playerProgressBar');
    }
  }

  setSliderPercentage(value: number, elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%, hsla(0,0%,100%,.3) ${value}%, hsla(0,0%,100%,.3) 100%)`;
    }
  }

  formatArtistName(name: string): string {
    if (name.includes('-')) {
      return name.split('-').map(it => it.includes('%') ? '' : it).join(' ');
    } else {
      return name;
    }
  }
}
