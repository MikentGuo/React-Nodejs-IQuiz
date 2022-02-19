import React from 'react'

import ReactLoading from 'react-loading';

export default function LeaderBoard(props) {
    const { users } = props
    if(!users)
        return  <div className="col-lg-2 container justify-content-center">
                    <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                </div>  

    return (
        <div>
            <table className = "table table-striped table-bordered">
                <thead className = "table-dark">
                    <tr>
                        <th className="text-center"> Rank </th>
                        <th className="text-center"> Image </th>
                        <th className="text-center"> Name</th>
                        <th className="text-center"> Score </th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        users ? users.map((user) => {
                            return (
                                <tr key={user.rank}>
                                    <td className="text-center" style={{verticalAlign:"middle"}} width="60px">{user.rank}</td>
                                    <td className="text-center" style={{verticalAlign:"middle"}} width="100px">
                                        <img style={{borderRadius: "50%", width: "60px", height: "60px"}} 
                                            src={process.env.REACT_APP_SERVER_URL + user.imageFilePath} width="100" alt="" /></td>
                                    <td className="text-center" style={{verticalAlign:"middle"}} width="300px">{user.username}</td>
                                    <td className="text-center" style={{verticalAlign:"middle"}}>{user.score*10+"%"}</td>
                                </tr>
                            )
                        }) : (
                            null //<ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                        )
                    }
                </tbody>            
            </table>		
    	</div>
    )
}
