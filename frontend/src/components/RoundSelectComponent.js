import React, {Component} from 'react';
import {Button} from "reactstrap";

class RoundSelect extends Component {
    handleClick = () => {
        //console.log(this.props.value);
        this.props.onSelect(this.props.value);
    };

    render() {
        return (
            <div className="m-1">
                <Button color="info" value="lower_R16" onClick={this.handleClick}>
                    {this.props.description}
                </Button>
            </div>
        );
    }
}

export default RoundSelect;