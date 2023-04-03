import React from 'react'
import Card from './Card'
import clock from "../../../assets/icons/clock.svg";
import phone from "../../../assets/icons/phone.svg";
import marker from "../../../assets/icons/marker.svg";


const Cards = () => {
    const cardData = [
        {
            id : 1,
            name : "Opening Hours",
            description : "Open 9.00 am to 5.00 pm Everyday",
            icon : clock,
            bgClass :"bg-primary"
        },
        {
            id : 2,
            name : "Visit our location",
            description : "Brooklyn, NY 10036, United States",
            icon : marker,
            bgClass :"bg-neutral"
        },
        {
            id : 3,
            name : "Contact us now",
            description : "+000 123 456789",
            icon : phone,
            bgClass :"bg-primary"
        }
    ]
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-24'>
      {
        cardData.map(card => <Card
        key={card.id}
        card={card}
        ></Card>)
      }
    </div>
  )
}

export default Cards
