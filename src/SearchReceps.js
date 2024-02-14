import React from "react";
import axios from "axios";

function SearchReceps(){
    const [receps, setReceps] = React.useState([])
    const [inputReceps, setInputReceps] = React.useState('')

    const viewReceps = axios.create({
        baseURL: 'https://api.spoonacular.com/recipes/complexSearch/',
        params: {
            'query': inputReceps,
            'apiKey': '375b7f317dd841898f4e6c7d8ae41522',
            'instructionsRequired': true,
            'addRecipeInformation': true
        },
        headers:{
            'Content-Type':' application/json'
        }
    })

    // const viewListReceps = receps.map(item => item.analyzedInstructions[0].steps) // Con esta variable en console.log() pude conocer la data que contiene para despues utilizarla en el return de la funcion componente

    const listReceps = async()=>{
        const {data, status} = await viewReceps.get()

        try{
            if(status === 200, 201){
                setReceps(data.results)
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
            value={inputReceps}
            onChange={(event)=>{
                setInputReceps(event.target.value)
            }}
            />
            <button
            onClick={listReceps}
            >Seleccionar</button>

            {receps.map((item, index)=>(
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

                    
                    {/* <ul>
                        {stepsReceps[index]?.analyzedInstructions[0]?.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>
                                {step.step}
                            </li>
                        ))}
                    </ul> */}
                </div>
            ))}
        </div>
    )
}

export  { SearchReceps }