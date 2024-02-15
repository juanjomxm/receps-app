import React from "react";
import axios from "axios";

function SearchRecips(){
    const [recips, setRecips] = React.useState([])
    const [inputRecips, setInputRecips] = React.useState('')

    const viewRecips = axios.create({
        baseURL: 'https://api.spoonacular.com/recipes/complexSearch/',
        params: {
            'query': inputRecips,
            'apiKey': '375b7f317dd841898f4e6c7d8ae41522',
            'instructionsRequired': true,
            'addRecipeInformation': true
        },
        headers:{
            'Content-Type':' application/json'
        }
    })

    // const viewListReceps = receps.map(item => item.analyzedInstructions[0].steps) // Con esta variable en console.log() pude conocer la data que contiene para despues utilizarla en el return de la funcion componente

    const listRecips = async()=>{
        const {data, status} = await viewRecips.get()

        try{
            if(status === 200, 201){
                setRecips(data.results)
            }
        }catch(error){
            console.warn(error)
        }
    }

    return(
        <div>
            <h2>Recetas</h2>

            <input
            placeholder="Buscar receta"
            value={inputRecips}
            onChange={(event)=>{
                setInputRecips(event.target.value)
            }}
            />
            <button
            onClick={listRecips}
            >Seleccionar</button>

            {recips.map((item, index)=>(
                <div key={index}>
                    <p>{item.title}</p>
                    <img
                    src={item.image}
                    width={200}
                    height={200}
                    />
                    <a href={item.sourceUrl}>Cocina</a>
                    <ul>
                        {item.analyzedInstructions[0].steps.map((item, stepIndex) => (
                            <li key={stepIndex}>
                                {item.step}
                            </li> // esta es la manera de poder agregar la receta para cada plato
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export  { SearchRecips }