// src/app/chart-display/chart-display.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Optional, if using datalabels

@Component({
  selector: 'app-chart-display2',
  template: `
    <div class="chart-container">
      <canvas #myChart></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      width: 90vw; /* Example: 90% of viewport width */
      max-width: 700px; /* Max width for the chart */
      height: 500px; /* Example height for a radar chart */
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      background-color: white;
      overflow: hidden; /* Helps contain the chart */
      display: flex; /* Use flexbox to center canvas if needed */
      justify-content: center;
      align-items: center;
    }
    canvas {
      display: block;
      width: 100% !important;
      height: 100% !important;
    }
  `],
  standalone: true // Important for Angular 19
})
export class ChartDisplayComponent2 implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myChart') myChartRef!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;

  constructor() {
    // Register Chart.js components globally once
    Chart.register(...registerables);
    // Register the datalabels plugin if you want labels on the points
    Chart.register(ChartDataLabels);
  }

  ngOnInit(): void {
    // You can prepare your data here, or fetch it from a service
  }

  ngAfterViewInit(): void {
    // Ensure the canvas context is available before creating the chart
    if (this.myChartRef && this.myChartRef.nativeElement) {
      this.createRadarChart();
    }
  }

  createRadarChart(): void {
    const ctx = this.myChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'radar', // <--- Set type to 'radar'
        data: {
          // These are your post categories
          labels: [
            'Technology',
            'Travel',
            'Food & Cooking',
            'Fashion',
            'Sports',
            'Politics',
            'Science',
            'Arts & Culture'
          ],
          datasets: [
            {
              label: 'Average Views per Post (Last Month)',
              data: [85, 60, 75, 40, 90, 30, 70, 50], // Example data for category popularity
              backgroundColor: 'rgba(255, 99, 132, 0.4)', // Area fill color
              borderColor: 'rgba(255, 99, 132, 1)', // Line color
              pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point color
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2
            },
            {
              label: 'Engagement Score (Scale 1-100)', // Another metric for comparison
              data: [70, 80, 65, 55, 75, 45, 85, 60],
              backgroundColor: 'rgba(54, 162, 235, 0.4)',
              borderColor: 'rgba(54, 162, 235, 1)',
              pointBackgroundColor: 'rgba(54, 162, 235, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow chart to take full container size
          elements: {
            line: {
              borderWidth: 3 // Global setting for line thickness
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Website Post Categories Performance' // Chart Title
            },
            legend: {
              display: true,
              position: 'top', // Legend position
            },
            tooltip: { // Customize tooltips on hover
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.r !== null) { // For radar, value is 'r' for radial
                    label += context.parsed.r;
                  }
                  return label;
                }
              }
            },
            datalabels: { // Optional: configuration for datalabels plugin
              display: false, // Set to true if you want labels on data points
              color: '#333',
              font: {
                weight: 'bold',
                size: 10
              },
              formatter: (value) => value // Display the raw value
            }
          },
          scales: {
            r: { // This is the radial axis for a radar chart
              angleLines: {
                display: true // Display lines radiating from the center
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.2)' // Grid line color
              },
              pointLabels: { // Labels around the perimeter (your categories)
                font: {
                  size: 14,
                  weight: 'bold'
                },
                color: '#333'
              },
              beginAtZero: true, // Start the scale from zero
              min: 0, // Explicitly set min value
              max: 100, // Explicitly set max value based on your data range
              ticks: { // Customizing the tick labels on the radial axis
                backdropColor: 'transparent', // Make background of ticks transparent
                color: '#555',
                stepSize: 25, // Example: ticks at 0, 25, 50, 75, 100
                callback: function(value) {
                    return value + ''; // Format as needed, e.g., value + '%'
                }
              }
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Destroy the chart instance when the component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
  }
}