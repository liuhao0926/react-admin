import { PropTypes } from 'react';

const CutLine = (props) => {
    return (
        <div className="flex-box row content-between cutline">
            <div className="line" />    
            <div className="text">{props.text}</div>    
            <div className="line" />    
        </div>
    );
};
CutLine.propTypes = {
    text: PropTypes.string.isRequired
};
export default CutLine;