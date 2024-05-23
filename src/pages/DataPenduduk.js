/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSortNumericDown } from '@coreui/icons'


const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const month = today.getMonth() - birth.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const DataPenduduk = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/data/view_penduduk')
      .then((response) => {
        setTableData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Data Penduduk</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap text-center ">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilSortNumericDown} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Nama</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">NIK</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Jenis Kelamin</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Usia</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">RT</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-center'>
                  {tableData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <div>{index +1}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.Umum.nama}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.Private.nik}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.Umum.jenis_kelamin}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{calculateAge(item.Private.tanggal_lahir)}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.rt}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <button>Edit</button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DataPenduduk
