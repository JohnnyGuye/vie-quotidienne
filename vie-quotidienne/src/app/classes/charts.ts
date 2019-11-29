declare var Snap;

export class Point {

    constructor( public x: number = 0, public y: number = null ) {
      x = x | 0;
      if( y === null || y === undefined ) 
        x = y;
    }

}

export class ChartDrawer {
  
  public steps = new Point( 77 / 14 );
  public id = 0;
  private static nextId = 0;
  
  constructor( public chartContainer: HTMLElement, public chartSvg: HTMLElement ) {
    this.id = ChartDrawer.nextId;
    ChartDrawer.nextId++;
  }
  
  drawGrid() {
    
    let graph = Snap( this.chartContainer );
    let g = graph.g();
    
    g.attr('id', 'grid');
    for ( let i = 0; i <= this.steps.x + 2; i++) {
        var horizontalLine = graph.path(
            "M" + 0 + "," + this.steps.x * i + " " +
            "L" + 77 + "," + this.steps.x * i);
        horizontalLine.attr('class', 'horizontal');
        g.add(horizontalLine);
    };
    for ( let i = 0; i <= 14; i++) {
        var horizontalLine = graph.path(
            "M" + this.steps.x * i + "," + 38.7 + " " +
            "L" + this.steps.x * i + "," + 0)
        horizontalLine.attr('class', 'vertical');
        g.add(horizontalLine);
    };
    
  }
  
  drawLine( points ) {
    
        var graph = Snap(this.chartSvg);
    
    
        /*END DRAW GRID*/
    
        /* PARSE POINTS */
        var myPoints = [];
        var shadowPoints = [];
    
        function parseData(points) {
            for ( let i = 0; i < points.length; i++) {
                var p = new Point();
                var pv = points[i] / 100 * 40;
                p.x = 83.7 / points.length * i + 1;
                p.y = 40 - pv;
                if (p.x > 78) {
                    p.x = 78;
                }
                myPoints.push(p);
            }
        }
    
        var segments = [];
    
        function createSegments(p_array) {
            for ( let i = 0; i < p_array.length; i++) {
                var seg = "L" + p_array[i].x + "," + p_array[i].y;
                if (i === 0) {
                    seg = "M" + p_array[i].x + "," + p_array[i].y;
                }
                segments.push(seg);
            }
        }
    
        function joinLine(segments_array, id) {
            var line = segments_array.join(" ");
            var line = graph.path(line);
            line.attr('id', 'graph-' + id);
            var lineLength = line.getTotalLength();
    
            line.attr({
                'stroke-dasharray': lineLength,
                    'stroke-dashoffset': lineLength
            });
        }
    
        function calculatePercentage(points, graph) {
          
          console.log( this, graph );
            var initValue = points[0];
            var endValue = points[points.length - 1];
            var sum = endValue - initValue;
            var prefix;
            var percentageGain;
            var stepCount = 1300 / sum;
    
            function findPrefix() {
                if (sum > 0) {
                    prefix = "+";
                } else {
                    prefix = "";
                }
            }
    
            var percentagePrefix = "";
    
            function percentageChange() {
                percentageGain = initValue / endValue * 100;
                
                if(percentageGain > 100){
                  console.log('over100');
                  percentageGain = Math.round(percentageGain * 100*10) / 100;
                }else if(percentageGain < 100){
                  console.log('under100');
                  percentageGain = Math.round(percentageGain * 10) / 10;
                }
                if (initValue > endValue) {
                  
                    percentageGain = endValue/initValue*100-100;
                    percentageGain = percentageGain.toFixed(2);
                  
                    percentagePrefix = "";
                    document.getElementsByClassName( 'percentage-value')[0].classList.add('negative');
                } else {
                    percentagePrefix = "+";
                }
              if(endValue > initValue){
                  percentageGain = endValue/initValue*100;
                  percentageGain = Math.round(percentageGain);
              }
            };
            percentageChange();
            findPrefix();
    
            var percentage = document.getElementsByClassName('percentage-value')[0];
            var totalGain = document.getElementsByClassName( 'total-gain')[0];
            var hVal = document.getElementsByClassName( 'h-value')[0];
    
            function count(graph, sum) {
                var totalGain = document.getElementsByClassName( 'total-gain')[0];
                var i = 0;
                var time = 1300;
                var intervalTime = Math.abs(time / sum);
                var timerID = 0;
                if (sum > 0) {
                    var timerID = setInterval(function () {
                        i++;
                        totalGain.innerHTML = percentagePrefix + i;
                        if (i === sum) clearInterval(timerID);
                    }, intervalTime);
                } else if (sum < 0) {
                    var timerID = setInterval(function () {
                        i--;
                        totalGain.innerHTML = (percentagePrefix + i);
                        if (i === sum) clearInterval(timerID);
                    }, intervalTime);
                }
            }
            count(graph, sum);
    
            percentage.innerHTML = (percentagePrefix + percentageGain + "%");
            totalGain.innerHTML = ("0%");
            setTimeout(function () {
                percentage.classList.add('visible');
                hVal.classList.add('visible');
            }, 1300);
    
        }
    
    
        function showValues() {
            var val1 = document.getElementsByClassName( 'h-value')[0];
            var val2 = document.getElementsByClassName('percentage-value')[0];
            val1.classList.add('visible');
            val2.classList.add('visible');
        }
    
        function drawPolygon(segments, id) {
            var lastel = segments[segments.length - 1];
            var polySeg = segments.slice();
            polySeg.push([78, 38.4], [1, 38.4]);
            var polyLine = polySeg.join(' ').toString();
            var replacedString = polyLine.replace(/L/g, '').replace(/M/g, "");
    
            var poly = graph.polygon(replacedString);
            var clip = graph.rect(-80, 0, 80, 40);
            poly.attr({
                'id': 'poly-' + id,
                /*'clipPath':'url(#clip)'*/
                    'clipPath': clip
            });
            // clip.animate({
            //     transform: 't80,0'
            // }, 1300, mina.linear);
        }
    
          parseData(points);
          
          createSegments(myPoints);
          calculatePercentage(points, this.chartContainer );
          joinLine(segments, this.id);
     
          drawPolygon(segments, this.id);
  }
  
}
// var chart_h = 40;
// var chart_w = 80;
// var stepX = 77 / 14;
// 
// var chart_1_y = [
//   15, 25, 40, 30, 45, 40, 35, 55, 37, 50, 60, 45,70, 78
// ];
// var chart_2_y = [
//   80, 65, 65, 40, 55, 34, 54, 50, 60, 64, 55, 27, 24, 30
// ];
// 
// drawGrid('#chart-2');
// drawGrid('#chart-1');
