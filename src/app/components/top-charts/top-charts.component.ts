import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SpotifyService} from "../../service/spotify.service";

@Component({
  selector: 'td-top-charts',
  templateUrl: './top-charts.component.html',
  styleUrls: ['./top-charts.component.scss']
})
export class TopChartsComponent implements OnInit {

  chartType: string = 'worldChart';
  chartData: any;

  chartLoader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chartService: SpotifyService
  ) {
  }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    if (url.length && url[1] === 'top-qaz') {
      this.chartType = 'qazChart';
    }

    this.getChartTracks(this.chartType);
  }

  getChartTracks(type: any) {
    this.chartLoader = true;
    //*
    this.chartService.getCharts(type).subscribe({
      next: (data: any) => {
        if (data && data.length) {
          // debugger;
          this.chartData = data.map((item: any) => {
            return {
              id: item?.key,
              name: item?.title,
              img_link: item?.images?.coverarthq || item?.images?.coverart,
              url: item?.hub?.actions ? item?.hub?.actions[1].uri : '',
              explicit: item?.hub?.explicit,
              artists: item?.artists?.map((artist: any) => ({
                id: artist?.id,
                name: artist?.alias
              })),
            }
          });
        }
        console.log(this.chartData);
        this.chartLoader = false;
      }, error: err => {
        alert(err.message);
        this.chartLoader = false;
      }
    });
    //*/
  }
}
