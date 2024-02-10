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
    <div id="form_container" className="container">
      <form id="form_admin" onSubmit={collectData}>
        <h1 id="form_h1" className="text-center pt-3">Admin Form</h1>
        <div className='adminform_divs'>
          <label id="form_label" className="form-label"> Department ID</label>
          <input
            type="text"
            className="forminputlabel"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className='adminformdivs'>
          <label id="form_label" className="form-label">Department Name</label>
          <input
            type="text"
            className="forminputlabel"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className='adminformdivs'>
          <label id="form_label">Group ID</label>
          <input
            type="text"
            className="form-control"
            value={workexperience}
            onChange={(e) => setworkexperience(e.target.value)}
          />
        </div>


        <div className='adminformdivs'>
          <label id="form_label" className="form-label">Group Description</label>
          <input
            type="text"
            className="forminputlabel"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
        </div>
        <div className='adminformdivs'>
          <label id="form_label" className="form-label">Group Admin</label>
          <input
            type="text"
            className="forminputlabel"
            value={linkdin}
            onChange={(e) => setlinkdin(e.target.value)}
          />
        </div>
        <div className='adminformdivs'>
          <label id="form_label" className="form-label">Icon</label>
          <input
            type="file" name="profileimage"

            value={Resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>


        <button id="form_button" type="submit" className="btn">

          Submit
        </button>
      </form>
    </div>
  );
}