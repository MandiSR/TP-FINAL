import React from "react";
import ReactApexChart from "react-apexcharts";


class NuevoGrafico extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "Bulbasaur",
            data: [44, 50, 46, 48, 69, 40]
            
        },
        {name: "Ivysaur",
        data: [14, 16, 15, 16, 16, 20]
        },
        {name: "Venusaur",
          data: [8, 8, 10, 10, 6, 2]
        },
        {name: "Charmander",
            data: [70, 82, 80, 70, 89, 72]
        },
        {name: "Charmeleon",
            data: [52, 60, 60, 68, 70, 61]
          },
        {name: "Charizard",
          data: [42, 46, 45, 20, 50, 40]
        },
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Ventas del mes',
            align: 'center'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], 
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          }
          
        },
      
      
      };
    }


  

    render() {
      return (
        <div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
          </div>
          <div id="html-dist"></div>
        </div>
      );
    }
  }



  export default NuevoGrafico