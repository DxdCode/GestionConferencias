import React, { useState } from 'react'
import useAuditorio from '../../hooks/useAuditorios'
import { ToastContainer } from 'react-toastify'
import FiltroBusqueda from '../../dashboard/FiltrarBusqueda'
import TablaAuditorio from './TablaAuditorio'
import ModalGestionar from '../../dashboard/ModalGestionar'

function GestionarAuditorio() {
  const { auditorio, loading, actualizarAuditorio, eliminarAuditorio } = useAuditorio()
  const [busqueda, setBusqueda] = useState("")
  const [campoFiltro, setCampoFiltro] = useState("nombre")
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    capacidad: ""
  })

  const normalizar = (valor) =>
    (valor || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()

  const auditoriosFiltrados = auditorio.filter((a) =>
    normalizar(a[campoFiltro]).includes(normalizar(busqueda))
  )

  const handleEdit = (a) => {
    setEditId(a._id)
    setFormData({ ...a })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    actualizarAuditorio(editId, formData)
    setEditId(null)
  }

  const campos = Object.keys(formData)
    .filter((key) => key !== "_id")
    .map((key) => ({
      value: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    }))

  return (
    <section>
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-sec">🏢 Gestionar Auditorios</h2>

      <FiltroBusqueda
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        campoFiltro={campoFiltro}
        setCampoFiltro={setCampoFiltro}
        campos={campos}
      />

      <TablaAuditorio
        auditorios={auditoriosFiltrados}
        campos={campos}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={eliminarAuditorio}
      />

      <ModalGestionar
        title="Editar Auditorio"
        editId={editId}
        setEditId={setEditId}
        formData={formData}
        handleChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        handleSubmit={handleUpdate}
      />
    </section>
  )
}

export default GestionarAuditorio
