class LiveChart {

    constructor(ctx, ticks, delay=10, duration=10000, refresh=70) {
        this.ctx = ctx;
        this.ticks = ticks;
        this.delay = delay;
        this.duration = duration;
        this.refresh = refresh;
        this.chart = this._initPlot();
    }

    _initPlot() {
        let color = Chart.helpers.color;
        return new Chart(this.ctx, {
            type: 'line',
            data: {
                datasets: [{
                    data: [],
                    backgroundColor: color('rgb(38, 166, 154)').alpha(0.5).rgbString(),
                    borderColor: 'rgb(38, 166, 154)',
                    fill: false,
                    lineTension: 0,
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                events: [],
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'realtime',
                        realtime: {
                            duration: this.duration,
                            refresh: this.refresh,
                            delay: this.delay
                        }
                    }],
                    yAxes: [{
                        ticks: this.ticks
                    }]
                }
            }
        });
    }

    addData(value) {
        const now = Date.now();
        this.chart.data.datasets.forEach(function(dataset) {
            dataset.data.push({
                x: now,
                y: value
            });
        });
    }

}