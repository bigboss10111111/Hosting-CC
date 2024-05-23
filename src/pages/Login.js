/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
    const [cookies, setCookie] = useCookies(['TOKEN'])
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()

      const data = {
        email: email,
        password: password,
      }

      try {
        const response = await fetch('http://localhost:3001/auth/login', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        if (result.message === 'Login successful' && result.token) {
          const decodedResult = jwtDecode(result.token)
          const username = decodedResult.name
          console.log('Token from server:', result.token)
          const expirationTime = decodedResult.exp ? new Date(decodedResult.exp * 1000) : null
          document.cookie = `username=${username}`

          setCookie('TOKEN', result.token, {
            expires: expirationTime,
          })
          console.log(cookies)
          if (cookies) {
            alert('Login successful')
            navigate('/dashboard')
          }
        } else {
          alert('Login failed')
          console.error('Invalid credentials:', result.message)
        }
      } catch (error) {
        alert('Login failed')
        console.error(error)
      }
    }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <span className="fw-bold text-center h3">RTAssistent</span>
                <CCardBody className="text-center d-flex align-items-center">
                  <CImage src="src\assets\images\rafiki.png" className="w-100"></CImage>
                </CCardBody>
              </CCard>
              <CCard className="p-4 pt-2 border border-primary">
                <CCardBody className="border border-primary rounded-1 mt-3">
                  <CForm>
                    <h2 className="text-center">SELAMAT DATANG</h2>
                    <p className="text-body-secondary text-center">Masuk ke akun Anda</p>
                    <div className="d-flex justify-content-center mb-3">
                      <CImage src="src\assets\images\R.png" className="w-25"></CImage>
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6} className="w-100">
                        <CButton color="primary" className="px-4 w-100" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right"></CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
