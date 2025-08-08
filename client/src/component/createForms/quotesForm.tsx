import './quote.css'
function Quote(){
    return(
        <form>
           <div className='input-container'>
                <label htmlFor="quote">enter quotes</label>
                <textarea id="quote" name="quote" />
           </div>
           <div className='btn-container'>
                <button>post</button>
           </div>
        </form>
    )
};

export default Quote