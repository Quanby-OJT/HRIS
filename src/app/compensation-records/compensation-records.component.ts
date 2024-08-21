import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexLegend,
  ApexTooltip,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
};

export type LineChartOptions = {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  markers: ApexMarkers;
};
@Component({
  selector: 'app-compensation-records',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './compensation-records.component.html',
  styleUrl: './compensation-records.component.css'
})
export class CompensationRecordsComponent {
  public chartOptions: ChartOptions;
  public lineChartOptions: LineChartOptions;
  

  constructor() {
    this.chartOptions = {
      series: [10000, 1000, 2000],
      chart: {
        height: 150,
        width: 380,
        type: 'pie'
      },
      labels: ['Base Salary', 'Total Allowances', 'Total Benefits'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -10 // Center the data labels in the middle of the pie slices
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
        offset: 0 // Center the data labels
      }
    } as ChartOptions;

    this.lineChartOptions = {
      series: [
        {
          name: "Salary",
          data: [7500, 7750, 8000, 8200, 8900, 10000]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        categories: ['Jan 2021', 'Oct 2021', 'Mar 2022', 'Dec 2022', 'May 2023', 'Oct 2024'],
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif'
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          colors: ['#333']
        },
        formatter: function (value: number) {
          return value; // Customize the data label format if needed
        }
      },
      stroke: {
        curve: 'smooth', // Makes the line smooth
        width: 2
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 4
      },
      markers: {
        size: 6,
        colors: ['#fff'],
        strokeColors: '#007bff',
        strokeWidth: 3
      }
    };
    
  }
}
