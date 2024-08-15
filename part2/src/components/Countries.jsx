import axios from "axios"
import { useEffect, useState } from "react"

// const SearchCountry = ({onSearch, country}) =>
//     <> Search Countries: <input type="text" onChange={onSearch} value={country} /> </>

const DisplayCountries = ({ name }) => {
    console.log(name);
    return (
        // <ul>
        //     {countries.map((country, id) => {
        //         <li key={id}>
        //             {country}
        //         </li>
        //     })}
        // </ul>
        
        <div>{}</div>
    )
}


const Countries = () => {
    const [country, setCountry] = useState({})

    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/finland`)
            .then(result => setCountry(result.data))
            .catch(error => alert(error))
    }, [])

    // const handleSearch = (event) => {
    //     setCountry(event.target.value)
    // }

    return (
        <div>
            {/* <SearchCountry onSearch={handleSearch}/> */}
            <DisplayCountries 
            country={country.name}
             />
        </div>
    )
}

export default Countries