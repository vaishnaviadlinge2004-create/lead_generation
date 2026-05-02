import { useState } from "react";
import axios from "axios";

const API = "http://localhost:7000";

function LeadForm() {
  const [lead, setLead] = useState({
    name: "",
    phone: "",
    source: "Call"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API}/leads`, lead);

    alert("Lead Added");

    setLead({ name: "", phone: "", source: "Call" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Lead</h2>

      <input
        value={lead.name}
        placeholder="Name"
        onChange={(e) => setLead({ ...lead, name: e.target.value })}
      />

      <input
        value={lead.phone}
        placeholder="Phone"
        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
      />

      <select
        value={lead.source}
        onChange={(e) => setLead({ ...lead, source: e.target.value })}
      >
        <option>Call</option>
        <option>WhatsApp</option>
        <option>Field</option>
      </select>

      <button type="submit">Add Lead</button>
    </form>
  );
}

export default LeadForm;