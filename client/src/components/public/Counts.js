import React from 'react'
import { useEffect } from 'react'
import PureCounter from './PureCounter'

import ReactLoading from 'react-loading';

export default function Counts(props) {
    const { data } = props

    useEffect( ()=>{
      new PureCounter()
    },[data])

    return (
        <div className="counts section-bg">
          <div className="container">
            <div className="row counters">
              {
                data?
                data.map( (item, index) => (
                    <div key={index} className="col-lg-3 col-6 text-center">
                      <span data-purecounter-start={item.start} data-purecounter-end={item.end} data-purecounter-duration="1" className="purecounter"></span>
                      <p>{item.name}</p>
                    </div>  
                )):
                (
                  <div className="col-lg-2 container justify-content-center">
                    <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                  </div>                             
                )
              }
            </div>
          </div>
        </div>        
    )
}
