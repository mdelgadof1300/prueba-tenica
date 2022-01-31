import React, { useState,useEffect} from 'react'

const player = [
    "Sachin",
    "Dravid",
    "Dhoni",
    "Raina",
    "Rohit",
    "Virat",
    "Shehwag",
    "Braitli",
    "Zaheer Khan",
    "Harbhajan",
]

const SearchByName = () => {
    const [name, setName] = useState([])
    const [searchItem, setSearchItem] = useState("")
    
    // const searchHandler=(e)=>{
    //    setSearchItem(e.target.value);
    // }

    useEffect(()=>{
     const result=player.filter((person)=>{
         return person.toLowerCase().includes(searchItem)
      });
      setName(result);
      console.log("search item",result)
    },[searchItem])


    return (
        <div className="SearchByName">
            <input type="text" placeholder="Search..."
                  value={searchItem}
                onChange={(e)=>setSearchItem(e.target.value)} />
             <div>
              { 
                  name.map((item)=>{
                    return <h5>{item}</h5>
               })
              }
             </div>
        </div>
    )
}

export default SearchByName



