import { NavLink } from "react-router-dom";

// import { NavLink } from "react-router-dom";
function Admin(){
    return(
        <>
       <div className="container home-stats text-center">
        <h1 className="dash">Dashbord</h1>
        <div className="row">
            <div className="col-md-4">
                <div className="stat st-user">
                    Users
                    <span><NavLink className='decoration' href="">view user</NavLink></span>
                </div>
            </div>
            <div className="col-md-4">
                <div className="stat st-deals">
                    Deals
                    <span><NavLink className='decoration' href="">view deals</NavLink></span>
                </div>
            </div>
            <div className="col-md-4">
                <div className="stat st-climed">
                    Climed Deals
                    <span><NavLink className='decoration' href="">view climed</NavLink></span>
                </div>
            </div>
           
        </div>
       </div>
        </>
    )
}
export default Admin;