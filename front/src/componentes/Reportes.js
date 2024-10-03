import React from "react";
import ReactApexChart from "react-apexcharts";
import NuevoGrafico from "./NuevoGrafico";
import "../estilos-pagina/mostrar.css";

import logoProducto from "./IMG COMPONENTES/reportes.png";

class Reportes extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "Bulbasaur",
            data: [45, 54, 49, 48, 69, 50]           
        },
        {name: "Ivysaur",
        data: [15, 18, 17, 16, 16, 22]
        },
        {name: "Venusaur",
          data: [10, 8, 12, 14, 8, 6]
        },
        {name: "Charmander",
            data: [72, 86, 82, 78, 94, 76]
        },
        {name: "Charmeleon",
          data: [56, 64, 68, 70, 70, 64]
        },
        {name: "Charizard",
        data: [45, 46, 49, 20, 50, 48]
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
            text: 'Compras del mes',
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
        <div className="container">
      <div className="logo-container">
        <img src={logoProducto} alt="Logo Producto" className="producto-logo" />
      </div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
          </div>
          <div id="chart">
            <NuevoGrafico></NuevoGrafico>
          </div>
          <div id="html-dist"></div>
        </div>
      );
    }
  }



  export default Reportes


