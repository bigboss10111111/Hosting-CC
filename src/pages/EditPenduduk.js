/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import {
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSortNumericDown } from '@coreui/icons'

const EditPenduduk = () => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    no_kk: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    rt: '',
    kelurahan: '',
    alamat: '',
    agama: '',
    status_perkawinan: '',
    pekerjaan: '',
    pendidikan: '',
    no_rumah: '',
    nama_ayah: '',
    nama_ibu: '',
    no_telepon: '',
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
      const response = await axios.post('http://localhost:3001/data/add_penduduk', formData)
      console.log('Data berhasil ditambahkan:', response.data)
      setFormData({
        nama: '',
        nik: '',
        no_kk: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        rt: '',
        kelurahan: '',
        alamat: '',
        agama: '',
        status_perkawinan: '',
        pekerjaan: '',
        pendidikan_terakhir: '',
        no_rumah: '',
        nama_ayah: '',
        nama_ibu: '',
        no_telepon: '',
      })
      setShowModal(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return (
    <>
      <CCol sm="12" lg="6" xl="3" className="w-100 pb-5 px-3">
        <CCard>
          <CCardHeader className="fw-bold">
            Detail Penduduk <span className="text-warning">( Mode Edit )</span>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CCardHeader className="fw-bold bg-primary mb-3">Personal</CCardHeader>
              <div className="row g-3">
                <div className="col-md-6">
                  <CFormLabel htmlFor="nama">Nama Lengkap</CFormLabel>
                  <CFormInput
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="Nama Lengkap"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="nik">NIK</CFormLabel>
                  <CFormInput
                    type="integer"
                    id="nik"
                    name="nik"
                    placeholder="NIK"
                    pattern="[0-9]{16}"
                    value={formData.nik}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="tempat_lahir">Tempat Lahir</CFormLabel>
                  <CFormInput
                    type="text"
                    id="tempat_lahir"
                    name="tempat_lahir"
                    placeholder="Tempat Lahir"
                    value={formData.tempat_lahir}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="tanggal_lahir">Tanggal Lahir</CFormLabel>
                  <CFormInput
                    type="date"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    placeholder="Tanggal Lahir"
                    value={formData.tanggal_lahir}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="jenis_kelamin">Jenis Kelamin</CFormLabel>
                  <CFormSelect
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-Laki">Laki - Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </CFormSelect>
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="agama">Agama</CFormLabel>
                  <CFormSelect
                    id="agama"
                    name="agama"
                    value={formData.agama}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katholik">Katholik</option>
                    <option value="Hindhu">Hindhu</option>
                    <option value="Budha">Budha</option>
                    <option value="Konghuchu">Konghucu</option>
                  </CFormSelect>
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="status_perkawinan">Status Perkawinan</CFormLabel>
                  <CFormSelect
                    id="status_perkawinan"
                    name="status_perkawinan"
                    value={formData.status_perkawinan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Status</option>
                    <option value="Sudah Kawin">Sudah Kawin</option>
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </CFormSelect>
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="pekerjaan">Pekerjaan</CFormLabel>
                  <CFormInput
                    type="text"
                    id="pekerjaan"
                    name="pekerjaan"
                    placeholder="Pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="pendidikan">Pendidikan</CFormLabel>
                  <CFormInput
                    type="text"
                    id="pendidikan"
                    name="pendidikan_terakhir"
                    placeholder="Pendidikan"
                    value={formData.pendidikan_terakhir}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="no_telepon">Nomor Telepon</CFormLabel>
                  <CFormInput
                    type="text"
                    id="no_telepon"
                    name="no_telepon"
                    placeholder="Nomor Telepon"
                    value={formData.no_telepon}
                    onChange={handleChange}
                    required
                  />
                </div>
                <CCardHeader className="fw-bold bg-primary mb-1">Keluarga</CCardHeader>
                <div className="col-md-6">
                  <CFormLabel htmlFor="nokk">No KK</CFormLabel>
                  <CFormInput
                    type="integer"
                    id="nokk"
                    name="no_kk"
                    placeholder="No KK"
                    pattern="[0-9]{16}"
                    value={formData.no_kk}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="ayah">Nama Ayah</CFormLabel>
                  <CFormInput
                    type="text"
                    id="ayah"
                    name="nama_ayah"
                    placeholder="Nama Ayah"
                    value={formData.nama_ayah}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="ibu">Nama Ibu</CFormLabel>
                  <CFormInput
                    type="text"
                    id="ibu"
                    name="nama_ibu"
                    placeholder="Nama Ibu"
                    value={formData.nama_ibu}
                    onChange={handleChange}
                    required
                  />
                </div>
                <CCardHeader className="fw-bold bg-primary mb-1">Alamat</CCardHeader>
                <div className="col-md-6">
                  <CFormLabel htmlFor="rt">RT</CFormLabel>
                  <CFormInput
                    type="text"
                    id="rt"
                    name="rt"
                    placeholder="RT"
                    value={formData.rt}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="kelurahan">Kelurahan</CFormLabel>
                  <CFormInput
                    type="text"
                    id="kelurahan"
                    name="kelurahan"
                    placeholder="Kelurahan"
                    value={formData.kelurahan}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="alamat">Alamat</CFormLabel>
                  <CFormInput
                    type="text"
                    id="alamat"
                    name="alamat"
                    placeholder="Alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel htmlFor="no_rumah">No Rumah</CFormLabel>
                  <CFormInput
                    type="text"
                    id="no_rumah"
                    name="no_rumah"
                    placeholder="No Rumah"
                    value={formData.no_rumah}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center gap-3 mt-4 pt-3">
                  <CButton color="primary" onClick={toggleModal}>
                    Simpan Perubahan
                  </CButton>
                  <CButton color="danger" onClick={toggleModal}>
                    Batal
                  </CButton>
                </div>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Simpan Data Penduduk</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Apakah Anda Yakin Untuk Menyimpan Perubahan?</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button onClick={handleSubmit} type="button" className="btn btn-success">
                  Ya, Saya Yakin
                </button>
                <button onClick={toggleModal} type="button" className="btn btn-secondary">
                  Tidak, Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditPenduduk
