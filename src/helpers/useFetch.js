import {useState, useEffect} from 'react';


const useFetch =  (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    //her renderda çalışır
    //eğer dizi içerisine değer verirsen 
    //sadece başlangıçta ve o değerler değişince çalışır
    useEffect(()=> {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then(res=> {
            if(!res.ok){
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log("fetch aborted");
            }else{

            setIsPending(false);
            setError(err.message)
            }
        })
        //cleanup : bu hooku kullanan bir component mount?=? olduğunda return olan değer
        return () => abortCont.abort();
     }, [url]);
     return {data, isPending, error};
}

export default useFetch;