import React from 'react';
import { Card } from 'react-bootstrap';
import './widget-count.scss';


function WidgetCount(props) {
  const { value, label, className } = props;


  return (
    <Card className={`${className} widget-count`}>
      <div>
        <div className="widget-count__label">
          {label}
        </div>
        <div className="widget-count__value">
          {Number(value).toLocaleString()}
        </div>
      </div>
    </Card>
  );
}


export default WidgetCount;
