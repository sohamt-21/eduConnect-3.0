import React from 'react'
import '../CSS/InfoCard.css'

const InfoCard = ({title,info}) => {
  return (
    <div className='infocardcontainer'>
      <div className="infocardtop">
        <hr id='infocardtophr' />
        <p id='infocardtoptitlep'>{title}</p>
      </div>

      <div className="infocardbottom">
        <p id='infocardbottominfop'>{info}</p>
      </div>
    </div>
  )
}

export default InfoCard