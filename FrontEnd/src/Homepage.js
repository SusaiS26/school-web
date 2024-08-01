import React from "react"
import './Homepage.css'

function Homepage() {
    return (
        <div className="full-container">
           
                <div className="row home-margin-padding">
                    <div className="col-12 home-backcolour">
                        <h1 class="schoolname-homepage">Sacred Heart Higher Secondary School, Anilady</h1>
                    </div>
                </div>
           
            <div className="row navigate-home">
                <div className="col">
                    <ul class="d-flex justify-content-between">
                        <li><a class="arefer" href="/company">Admission</a></li>
                        <li><a class="arefer" href="/Susai">Fees</a></li>
                        <li><a class="arefer" href="/Susai">Exam</a></li>
                        <li><a class="arefer" href="/Susai">Staff</a></li>
                        <li><a class="arefer" href="/Susai">Management</a></li>
                    </ul>
                </div>
            </div>
            <div id='myDivtwo' class="heightpic">

            </div>
        </div>
    )
}
export default Homepage;

