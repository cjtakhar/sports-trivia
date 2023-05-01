const Dubs = () => {
    return (
        <div className='logo-container'>
            <img 
                className='dubs-logo spin'
                src={process.env.PUBLIC_URL + '/goldblooded.jpeg'}
                alt='dubs'
            />
        </div>
    )
}

export default Dubs;