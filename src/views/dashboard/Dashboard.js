/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLan, cilLockLocked, cilPeople, cilPlus, cilSortNumericDown, cilTrash, cilUser, cilX } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [tableData, setTableData] = useState([])
  const [regis, setRegis] = useState(false)

  const toggleRegis = () => {
    setRegis(!regis)
  }

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/add_user', formData)
      console.log('Data berhasil ditambahkan:', response.data)
      setFormData({
        name: '',
        role: '',
        email: '',
        password: '',
      })
      setRegis(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [regis])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/view_user')
      setTableData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <div>Akun Admin</div>
              <CButton color="primary" onClick={toggleRegis} className="w-auto fw-semibold">
                Tambah Admin{' '}
                <span>
                  <CIcon icon={cilPlus} />
                </span>
              </CButton>
            </CCardHeader>

            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap text-center">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilSortNumericDown} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Nama
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Jabatan</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="text-center">
                  {tableData.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.role}</div>
                      </CTableDataCell>
                      <CTableDataCell>tes</CTableDataCell>
                      <CTableDataCell>
                        <CButton color='danger'><CIcon icon={cilTrash} /></CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {regis && (
        <CContainer className="fixed-top" style={{ top: '10%' }}>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardHeader className="d-flex justify-content-end">
                  <CButton onClick={toggleRegis}>
                    <CIcon icon={cilX} />
                  </CButton>
                </CCardHeader>
                <CCardBody className="p-4 pt-1">
                  <CForm>
                    <h1>Tambah Admin</h1>
                    <p className="text-body-secondary">Tambahkan Akun Admin</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='text' name='name' placeholder="Nama" value={formData.name} onChange={handleChange} required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLan} />
                      </CInputGroupText>
                      <CFormInput type="text" name='role' placeholder="Jabatan" autoComplete="role" value={formData.role} onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput type="email" name='email' placeholder="Email" autoComplete="email" value={formData.email} onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        placeholder="Password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={handleSubmit}>Tambah Akun</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </>
  )
}

export default Dashboard
