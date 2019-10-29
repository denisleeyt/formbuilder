import React from 'react';

class JCFreehtml extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const info = this.props.info;
    return (
      <div className="col-sm-12 col-md-12">
        <div dangerouslySetInnerHTML={{__html: info.Top}} />
      </div>
    );
  }
}

export default JCFreehtml