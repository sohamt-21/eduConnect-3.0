import React from 'react'
import { OrganizationList } from "@clerk/clerk-react";

const ManageOrg = () => {
  return (
    <>
      <div style={{margin:"auto",width:'fit-content' , height:'100vh'}}>
        <OrganizationList  afterSelectOrganizationUrl={org => `/organization/org_2c9B6noA6mdZHjxfwvUMTV3L4MR`}  />
      </div>
    </>
  )
}

export default ManageOrg