import { useEffect, useState } from 'react'
import getAPI from '../services/index'
import { Form, Table } from 'react-bootstrap'

export function Leads(data) {
  const [leadName, setLeadName] = useState([])
  const [leadData, setLeadData] = useState([])

  async function getData() {
    const data = await getAPI()
    setLeadData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <input
        type="text"
        placeholder="Busque pelo nome do contato"
        className="form-control p-2 m-2 w-50"
        onChange={({ target }) => setLeadName(target.value)}
      />
      <Form>
        {leadData &&
          leadData.map(lead => (
            <Form.Check
              type="checkbox"
              className="mb-3 text-light"
              label={lead.company.bs}
              value={lead.company.bs}
            />
          ))}
      </Form>
      <Table striped bordered hover variant="dark" className="m-2 w-75">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Empresa</th>
            <th>E-mail</th>
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
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  )
}
