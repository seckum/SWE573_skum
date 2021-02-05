import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Chartist from 'chartist';
import { TwitterSkApiService } from 'src/services/twitter-sk-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  public searchField = '';

  constructor(protected twitterSkApiService: TwitterSkApiService) {}

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', (data) => {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq2 = 0;
  }

  ngOnInit(): void {

  }

  public onSearch() {
    if(!this.searchField){
      alert('No key entered');
      return;
    }
    this.twitterSkApiService.getFrequentlySearchResult(this.searchField).subscribe((res) => {
      const datawebsiteViewsChart={labels:res.map(p=>p[0]),series:[res.map(p=>p[1])]};
      const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 10000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    const responsiveOptions: any[] = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: (value) => {
              return value[0];
            },
          },
        },
      ],
    ];
    const websiteViewsChart1 = new Chartist.Bar(
      '#websiteViewsChart1',
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );
    this.startAnimationForBarChart(websiteViewsChart1);
    });
  }
public sentimentAnalysis() {
    this.twitterSkApiService.twitterSentimetAnalys().subscribe((res: any) => {
      let groupMap = [-1, -0.75, -0.5, -0.25, 0.0, 0.25, 0.5, 0.75, 1];
      const data = {};
      for (let i = 0; i < groupMap.length - 1; i++) {
        data[`${groupMap[i]} ${groupMap[i + 1]}`] = res.filter(
          (item) => Number(item[0]) >= groupMap[i] && Number(item[0]) < groupMap[i + 1]
        ).length;
      }
      const mappedData = Object.entries(data);
      const datawebsiteViewsChart = {
        labels: mappedData.map((p) => p[0]),
        series: [mappedData.map((p) => p[1])],
      };
      const optionswebsiteViewsChart = {
        axisX: {
          showGrid: false,
        },
        low: 0,
        high: 5000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
      };
      const responsiveOptions: any[] = [
        [
          'screen and (max-width: 640px)',
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: (value) => {
                return value[0];
              },
            },
          },
        ],
      ];
      const websiteViewsChart2 = new Chartist.Bar(
        '#websiteViewsChart2',
        datawebsiteViewsChart,
        optionswebsiteViewsChart,
        responsiveOptions
      );
      this.startAnimationForBarChart(websiteViewsChart2);
    });
  }
}
