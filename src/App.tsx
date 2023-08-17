import './App.css';
import { ChangeEvent, useEffect, useState } from 'react'
import { useApi } from './hooks/useApi'
import { Loader } from './components/Loader'

function App() {

    const URL = 'http://jsonplaceholder.typicode.com/posts?_limit=5'

    const { fetchData, apiResponse, isLoading, apiError } = useApi()
    const [loaderShowTime, setLoaderShowTime] = useState(1000)
    const [timeout, setTimeout] = useState(3000)

    useEffect(() => {
        fetchData(URL, timeout, loaderShowTime)
    }, [timeout, loaderShowTime])

    const changeHandlerLoader = (event: ChangeEvent<HTMLInputElement>) => {
        setLoaderShowTime(Number(event.target.value))
    }
    const changeHandlerTimeout = (event: ChangeEvent<HTMLInputElement>) => {
        setTimeout(Number(event.target.value))
    }

    return (
        <div className="App">

            <h1 className="App-header">
                Api test
            </h1>
            <div style={{ display: 'flex', gap: "20px", justifyContent: "center"}}>
                Loader show time, ms:
                <input type={'number'} step={100} value={loaderShowTime} onChange={changeHandlerLoader}/>
                Timeout connection, ms:
                <input type={'number'} step={100} value={timeout} onChange={changeHandlerTimeout}/>
            </div>
            <button style={{ marginTop: '20px'}} onClick={() => fetchData(URL, timeout, loaderShowTime)}>Refresh posts</button>

            { isLoading && !apiError && <Loader /> }

            { apiError && <p>Error: {apiError}</p> }

            { !isLoading && !apiError && apiResponse?.data.map((post: any) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
                )
            )}

        </div>
    )
}

export default App
