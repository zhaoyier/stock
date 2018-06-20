import React from 'react';  
import ReactDOM from 'react-dom'; 

class App extends React.Component{  
    render(){  
        return (  
            <div>  
                <p>Please Login</p>
            </div>  
        )  
    }  
}
ReactDOM.render(( 
    <App/> 
), document.getElementById('container')); 