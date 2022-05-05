import { useEffect, useState } from 'react'
import getAPI from '../services/index'
import { Button, Form, Table } from 'react-bootstrap'

export function Leads(data) {
  const [leadName, setLeadName] = useState([])
  const [leadData, setLeadData] = useState([])
  const [category, setCategory] = useState(null)

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
        className="d-flex justify-content-center p-2 m-2 w-25 rounded"
        onChange={({ target }) => setLeadName(target.value)}
      />
      <span className="d-flex justify-content-center">
        Encontre a empresa por categoria:
      </span>
      <Form.Select
        className="w-25"
        onChange={({ target }) => setCategory(target.value)}
      >
        {leadData.map(lead => (
          <option value={lead.company.bs} key={lead.id}>
            {lead.company.bs}
          </option>
        ))}
      </Form.Select>
      <Button
        variant="dark"
        className="d-flex justify-content-center m-2 p-2 fst-italic"
        onClick={() => setCategory(null)}
      >
        Limpar categoria
      </Button>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="w-100 text-center"
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Empresa</th>
            <th>E-mail</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {leadData && category === null
            ? leadData
                .filter(lead => lead.name.toLowerCase().includes(leadName))
                .map(lead => (
                  <tr>
                    <td>{lead.name}</td>
                    <td>{lead.company.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                  </tr>
                ))
            : leadData
                .filter(lead => lead.company.bs === category)
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
