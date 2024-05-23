import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import 'src/assets/images/wave-haikei.svg'
import axios from 'axios'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  const [bayi, setBayi] = useState([])
  const [penduduk, setPenduduk] = useState([])
  const [lansia, setLansia] = useState([])
  const [keluarga, setKeluarga] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/data/jumlah_bayi')
      .then((response) => {
        setBayi(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  useEffect(() => {
    axios
      .get('http://localhost:3001/data/jumlah_lansia')
      .then((response) => {
        setLansia(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  useEffect(() => {
    axios
      .get('http://localhost:3001/data/jumlah_penduduk')
      .then((response) => {
        setPenduduk(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  useEffect(() => {
    axios
      .get('http://localhost:3001/data/jumlah_keluarga')
      .then((response) => {
        setKeluarga(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={penduduk.jumlahPenduduk}
          title="Jumlah Penduduk"
          className="fw-semibold fs-4"
          style={{ minHeight: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={bayi.jumlahBayi}
          title="Jumlah Bayi"
          className="fw-semibold fs-4"
          style={{ minHeight: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={lansia.jumlahLansia}
          title="Jumlah Lansia"
          className="fw-semibold fs-4"
          style={{ minHeight: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={keluarga.jumlahKeluarga}
          title="Jumlah Kepala Keluarga"
          className="fw-bold fs-5"
          style={{ minHeight: '150px' }}
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
