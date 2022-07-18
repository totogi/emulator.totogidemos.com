<template>
<CCard>
  <CCardBody>
    <Doughnut :chart-data="chartData()" :chart-options="options" />
  </CCardBody>
</CCard>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, SubTitle, Tooltip, ArcElement, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, SubTitle, Tooltip, ArcElement, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  props: {
    volumeUsed: {
      type: Number,
      default: 0
    },
    volumeRemaining: {
      type: Number,
      default: 0
    },
    chargeType: {
      type: String,
      default: 'SMS'
    }
  },
  methods: {
    chartData: function () {
      let usedColor
      if (this.volumeUsed / 2 > this.volumeRemaining) {
        usedColor = '#FF4F58'
      } else if (this.volumeUsed > this.volumeRemaining) {
        usedColor = '#FEE389'
      } else {
        usedColor = '#001D3D'
      }
      const chartData = {
        datasets: [{
          data: [this.volumeUsed, this.volumeRemaining],
          backgroundColor: [usedColor, '#D3D3D3']
        }]
      }
      return chartData
    }
  },
  data () {
    return {
      options: {
        animation: {
          duration: 0
        },
        plugins: {
          title: {
            display: true,
            text: this.chargeType,
            font: {
              size: 25
            }
          },
          subtitle: {
            display: true,
            font: {
              size: 14
            },
            text: `${this.volumeUsed} Used / ${this.volumeRemaining} Remaining`
          }
        },
        rotation: 270, // start angle in degrees
        circumference: 180 // sweep angle in degrees
      }
    }
  }
}
</script>
