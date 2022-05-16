class Node extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            downloading: false
        }
    }

    render(){
        return (
            <>
                <div className='node'>
                </div>
                <div className='node'>
                </div>
            </>
          );
    }


}