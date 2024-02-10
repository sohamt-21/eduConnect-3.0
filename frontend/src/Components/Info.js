import React from 'react'
import '../CSS/Info.css'
import InfoCard from './InfoCard'

const Info = () => {
  return (
    <div className='infoContainer'>
      <div className="infotop">

        <div className="infotopleft">
          <hr id='infotophr' />
          <p id='infotextid'>WebAppName</p>
        </div>

        <div className="infotopright">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi itaque quisquam doloremque cupiditate ea ipsa eum delectus tempora iste officiis deleniti beatae, rem pariatur recusandae, nobis, aut eveniet accusamus deserunt.
        </div>
      </div>

      <div style={{ height: '20%' }}></div>

      <div className="infomid">
        <h1 id='infomidh2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Possimus, officia nemo</h1>
        <p id='infomidp'>Explore the web</p>
      </div>

      <div style={{ height: '15%' }}></div>

      <div className="infobottom">
        <InfoCard title={'Some title'} info={"few lines of info in case of further use which will go in bottom also adding this lines so thast m=it gets what we wants to d here infucdsckgdsaUKC"} />
        <InfoCard title={'Some title'} info={"few lines of info in case of further use which will go in bottom also adding this lines so thast m=it gets what we wants to d here infucdsckgdsaUKC"} />
        <InfoCard title={'Some title'} info={"few lines of info in case of further use which will go in bottom also adding this lines so thast m=it gets what we wants to d here infucdsckgdsaUKC"} />
      </div>
    </div>
  )
}

export default Info