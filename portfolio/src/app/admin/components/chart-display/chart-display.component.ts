// src/app/chart-display/chart-display.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { BubbleDataPoint, Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-display',
  template: `
    <div class="chart-container">
      <canvas #myChart></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 80%; /* Adjust as needed */
      max-width: 700px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      background-color: white;
    }
    canvas {
      display: block; /* Ensures it doesn't have extra space below */
      width: 100% !important; /* Ensure canvas fills its container */
      height: auto !important; /* Maintain aspect ratio */
    }
  `],
  standalone: true // Important for Angular 19
})
export class ChartDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;

  constructor() {
    // Register Chart.js components globally once
    // This is crucial for Chart.js v3+ to make charts work.
    Chart.register(...registerables);
    // Register the datalabels plugin if you installed it
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    // You can prepare your data here
  }

  ngAfterViewInit(): void {
    this.createBarChart();
    // this.createPieChart(); // Call other chart types if needed
  }

  createBarChart(): void {
    const ctx = this.myChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar', // Can be 'bar', 'pie', 'line', 'doughnut', 'polarArea', 'radar', 'bubble', 'scatter'
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Sales by Month',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Set to false to allow custom size if container is managed by CSS
          plugins: {
            title: {
              display: true,
              text: 'Monthly Sales Data'
            },
            legend: {
              display: true,
              position: 'top',
            },
            // Configure datalabels plugin
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: '#333',
              font: {
                weight: 'bold'
              },
              formatter: (value) => value + ' units' // Example formatter
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Units Sold'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            }
          }
        }
      });
    }
  }

  createPieChart(): void {
    const ctx = this.myChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green'],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100, 40],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Pie Chart Example'
            },
            legend: {
              position: 'top',
            },
            datalabels: {
              color: '#fff',
              formatter: (value, context) => {
                const total:any = context.chart.data.datasets[0].data.reduce((sum:any, current:any) => sum + current, 0);
                const percentage = ((value / total) * 100).toFixed(2) + '%';
                return percentage;
              },
              font: {
                weight: 'bold'
              }
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Destroy the chart instance to prevent memory leaks
    if (this.chart) {
      this.chart.destroy();
    }
  }
}