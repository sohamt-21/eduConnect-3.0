import React, { useState } from "react";
import '../CSS/AdminForm.css';


export default function Form() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [workexperience, setworkexperience] = useState("");
  const [address, setaddress] = useState("");
  const [linkdin, setlinkdin] = useState("");
  const [Resume, setResume] = useState("");

  const collectData = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:9000/", {
      method: "post",
      body: JSON.stringify({ name, email, workexperience, address, linkdin, Resume }),
      headers: {
        'Content-Type': "application/json",
      },
    }).then(() => {
      alert("Added Student")
    });
  };

  return (
    <div className="adminFormcontainer">
      <div class="admin_grp_form">
        <form id="admin_grp_form_sub" onSubmit={collectData}>
          <h1 id="admin_grp_form_h1" className="admin_grp_form_text-center">Admin Form</h1>
          <div >
            <label id="admin_grp_label" className="admin_grp_form-label"> Department ID</label>
            <input
              type="text"
              className="admin_grp_form-control"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '4px' }}>
            <label id="admin_grp_form_label" className="admin_grp_form-label">Department Name</label>
            <input
              type="text"
              className="admin_grp_form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '3px' }}>
            <label id="admin_grp_form_label" className="admin_grp_form-label">Group ID</label>
            <input
              type="text"
              className="admin_grp_form-control"
              value={workexperience}
              onChange={(e) => setworkexperience(e.target.value)}
            />
          </div>


          <div style={{ marginBottom: '3px' }}>
            <label id="admin_grp_form_label" className="admin_grp_form-label">Group Description</label>
            <input
              type="text"
              className="admin_grp_form-control"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '3px' }}>
            <label id="admin_grp_form_label" className="admin_grp_form-label">Group Admin</label>
            <input
              type="text"
              className="admin_grp_form-control"
              value={linkdin}
              onChange={(e) => setlinkdin(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '3px' }}>
            <label id="admin_grp_form_label" className="admin_grp_form-label">Group Icon</label>
            <input
              type="file" name="profileimage"
              value={Resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>


          <button id="admin_grp_form_button" type="submit" className="admin_grp_form_btn">

            Submit
          </button>
        </form>
      </div>
    </div>
  );
}