import { useEffect, useState } from 'react'
import getAPI from '../services/index'
import { Table } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'

export function Leads(data) {
  const [leadName, setLeadName] = useState([])
  const [leadData, setLeadData] = useState([])
  const [category, setCategory] = useState([])

  async function getData() {
    const data = await getAPI()
    setLeadData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <h2 className="text-center p-2 fw-light fst-italic">Encontre Leads</h2>
      <input
        type="text"
        placeholder="Busque pelo nome do contato"
        className="p-2 m-2 w-50 rounded text-center"
        onChange={({ target }) => setLeadName(target.value)}
      />
      <form>
        <label htmlFor="category" className="text-center p-2 fst-italic">
          Encontra a empresa por categoria:
          <select
            name="category"
            id="category"
            onChange={({ target }) => setCategory(target.value)}
            className="form-select form-select-sm m-3"
          >
            {leadData &&
              leadData.map(lead => (
                <option key={lead} value={lead.company.bs}>
                  {lead.company.bs}
                </option>
              ))}
          </select>
        </label>
      </form>
      <Table striped bordered hover variant="dark" className="m-2 w-75">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Empresa</th>
            <th>E-mail</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {leadData &&
            leadData
              .filter(lead => lead.name.toLowerCase().includes(leadName))
              .map(lead => (
                <tr>
                  <td>{lead.name}</td>
                  <td>{lead.company.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  )
}
