class LiveChart {

    constructor(ctx, delay=0, duration=10000, refresh=70) {
        this.ctx = ctx;
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
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'realtime',
                        realtime: {
                            duration: 10000,
                            refresh: 70,
                            delay: 0
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
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