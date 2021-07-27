import React from 'react';

class Button extends React.Component{

    render() {
        const value = this.props.name;
        return <div className="Button">
            {value}
        </div>
    }
}


export default Button