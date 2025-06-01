import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  standalone: true,
  template: `
    <div class="card chart">
      <h3>Satış Trendleri (Canlı)</h3>
      <canvas #myChart width="600" height="300"></canvas>
    </div>
  `,
  styles: [`
    .card.chart {
      background: #fff;
      border-radius: 1.6rem;
      box-shadow: 0 6px 32px 0 rgba(50,80,130,0.11);
      padding: 2rem;
      max-width: 680px;
      margin: 0 auto;
    }
    h3 { margin-bottom: 1.2rem; color: #1976d2; }
    canvas { background: #f5f6fa; border-radius: 1rem; }
  `]
})
export class ChartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('myChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;
  intervalId: any = null;

  barChartData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    datasets: [{
      label: 'Satış',
      data: [600, 820, 720, 950, 840, 1100],
      backgroundColor: '#42a5f5'
    }]
  };

  ngAfterViewInit() {
    this.createChart();
    this.intervalId = setInterval(() => this.addLiveData(), 5000);
  }

  createChart() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: this.barChartData,
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  addLiveData() {
    // Ay ve rastgele veri ekle
    const nextMonth = `Ay ${this.barChartData.labels.length + 1}`;
    const nextValue = Math.floor(Math.random() * 600) + 400;
    this.barChartData.datasets[0].data.push(nextValue);
    this.chart?.update();
  }

  ngOnDestroy() {
    if (this.chart) this.chart.destroy();
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
