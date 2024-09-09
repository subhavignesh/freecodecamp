import React, { useEffect, useState } from 'react'




const Quote = () => {

    const [color, setColor] = useState('#1E90FF')
    const [quote,setQuote] = useState({ quote: 'Loading...', author: 'Loading...' })
    const [data,setData] = useState()
    

    //declare function to fetch the data
    const fetchData = async () => {
        const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        try {
            const response = await fetch(url)
            const result = await response.json()
            if(result && result.quotes){
                getRandomQuote(result.quotes)
                setData(result.quotes)
                getRandomColor()
            }
        } catch (error) {
            console.log("error:",error)
        }
    }

    useEffect(() => {
        fetchData()
      }, [])


    //declare function to generate random number and set Quote accoringly
    const getRandomQuote = (data) => {
        const random = Math.floor(Math.random()*data.length)
        const quote = data[random].quote
        const author = data[random].author

        setQuote({
            quote: quote,
            author: author
        })
    }

    const getRandomColor = () => {
        const randomNumber = Math.floor(Math.random() * 16777215);
        const hexColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
        setColor(hexColor)
    }

   const handleClickFunc = () => {
    getRandomColor()
    getRandomQuote(data)
   }


  return (
    <div style={{backgroundColor: color}} className='w-[100vw] h-[100vh] flex justify-center items-center'>
        
       <div id="quote-box" className='bg-white'>
       
        <div id="text" className='flex gap-5'>

            <p style={{color:color, fontSize: '24px'}} className='text-wrap text-xl font-semibold'>{quote.quote}</p>
        </div>

        
        
       <div id="author" className='flex items-center justify-end gap-1 py-5'>
        
         <p style={{color:color, fontSize: '16px'}} className='text-wrap'>{quote.author}</p>
       </div>
        


        <div className='flex gap-4 items-center justify-center'>
            <div><a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">Twitter</a></div>
            <div className='flex-1'><button id="new-quote" type='button' 
            className='btn' 
            style={{backgroundColor: color, fontSize: '16px'}}
            onClick={handleClickFunc}
            >New Quote</button></div>
        </div>
       </div>
    </div>
  )
}

export default Quote