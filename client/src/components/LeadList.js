import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7000";

function LeadList() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.get(`${API}/leads`);
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/leads/${id}`, { status });
    fetchLeads();
  };

  const deleteLead = async (id) => {
    await axios.delete(`${API}/leads/${id}`);
    fetchLeads();
  };

  return (
    <div>
      <h2>Leads List</h2>

      {leads.map((lead) => (
        <div key={lead.id}>
          <p>
            {lead.name} - {lead.phone} ({lead.source})
          </p>

          <select
            value={lead.status}
            onChange={(e) => updateStatus(lead.id, e.target.value)}
          >
            <option>Interested</option>
            <option>Not Interested</option>
            <option>Converted</option>
          </select>

          <button onClick={() => deleteLead(lead.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default LeadList;