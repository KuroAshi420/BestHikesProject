import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { getEvents, filterEvents } from "../../Redux/actions/actionEvent";

import Home from "../Home/Home";
import Register from "../Authentification/Register";
import Login from "../Authentification/Login";
import Acceuil from "../Acceuil/Acceuil";
import Navbar from "../HeaderFooter/Navbar";
import Guider from "../Guiders/Guider";
import Footer from "../HeaderFooter/Footer";
import Event from "../Events/Event";
import Advice from "../Advices/Advice";
import Search from "../Search/search";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Checkout from "../Checkout/Checkout";
import For0For from "../Redirection/For0For";
import Profils from "../Profile/Profile/profile";
import Entete from "../Profile/Profile/components/entete";
import NavBar from "../Profile/Profile/components/navbar";
import ProfilBody from "../Profile/Profile/components/profilBody";
import Photos from "../Profile/Profile/components/photos";
import Videos from "../Profile/Profile/components/Videos";
import Tripies from "../Profile/Profile/components/Tripies";
import Publication from "../Profile/Profile/components/publication";
import Materiel from "../Profile/Profile/components/Materiel";
import ListMyEvents from "../Participant/ListEvents"
import ListParticipants from "../Participant/ListParticipants";
import Carroussel from "../3D/3Dcarroussel";
import Carroussel2 from "../3D/carroussel 2/carroussel";
import "./main.css"
import AddMateriell from "../materiels/AddMateriels";
import AddPub from "../Publication/AddPublication";
import Pub from "../Profile/Profile/components/Tripies";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      filtredEvents: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      /************************************************************************************/
      const filterEventsByOrganisator = async () => {
        await axios
          .get(`http://localhost:5000/events/findEvents/${decoded.userName}`)
          .then((resp) => this.setState({ filtredEvents: resp.data }));
      };
      filterEventsByOrganisator();
      /************************************************************************************/
      const getCurrentUser = async () => {
        await axios
          .get(`http://localhost:5000/users/${decoded.id}`)
          .then((resp) => this.setState({ currentUser: resp.data }));
      };
      getCurrentUser();
      /************************************************************************************/ 
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <Route exact path="/acceuil">
            <Navbar />
            <Acceuil />
          </Route> */}
          <Route exact path="/guiders">
            <Navbar />
            <Guider />
            <Footer />
          </Route>
          <Route exact path="/events/:id" component={Event} />
          <Route exact path="/advices">
            <Navbar />
            <Advice />
            <Footer />
          </Route>

          <Route exact path="/MyEvents">
              <Navbar/>
            <ListMyEvents /> 
          </Route>
          <Route exact path="/MyEvents/:Myid" component={ListParticipants}/>
              

          <Route exact path="/cart/:id" component={ShoppingCart} />
          {/* <Route exact path="/filterEvents">
            <Navbar />
            <Search />
            <Footer />
          </Route> */}
          <Route
            exact
            path="/filterEvents"
            render={(props) => (
              <div >
                <Navbar />
                <Entete />
           <NavBar />
           
        <div className="row mother-container">
            <ProfilBody props={this.state.currentUser} {...props} />
            
            
            <Search />
            </div>
            </div>
            )}
          ></Route>




          {/* <Route
            exact
            path="/acceuil"
            render={(props) => (
              <div>
                <Navbar /><Entete />
           <NavBar />
            <ProfilBody props={this.state.currentUser} {...props} />
            <Pub/>
              </div>
            )}
          ></Route> */}
 <Route
            exact
            path="/acceuil"
            render={(props) => (
              <div >
                <Navbar />
                <Entete />
           <NavBar />
           
        <div className="row mother-container">
            <ProfilBody props={this.state.currentUser} {...props} />
            
            <Pub/>
            </div>
            </div>
            )}
          ></Route>
         

          <Route
            exact
            path="/allevents"
            render={(props) => (
              <div >
                <Navbar />
                <Entete />
           <NavBar />
           
        <div className="row mother-container">
            <ProfilBody props={this.state.currentUser} {...props} />
            
            <Publication/>
            </div>
            </div>
            )}
          ></Route>
         
          
          <Route exact path="/photos">
          <Navbar />
          <Entete />
           <NavBar />
            <Photos />
          </Route>
          <Route exact path="/videos">
          <Navbar />
          <Entete />
           <NavBar />
            <Videos />
          </Route>
          <Route  path="/publication">
          <Navbar />
          <Publication/>
          </Route>
          <Route exact path="/tripies">
          <Navbar />
          <Entete />
           <NavBar />
          <Tripies/>
          </Route>
          <Route exact path="/photos">
          <Navbar />
          <Entete />
           <NavBar />
            <Photos />
          </Route>
          <Route exact path="/videos">
          <Navbar />
          <Entete />
           <NavBar />
            <Videos />
          </Route>
          <Route exact path="/addmateriel">
            <Navbar />
            <AddMateriell />
            <Footer />
            
          </Route>
          <Route exact path="/addPublication">
            <Navbar />
            <AddPub/>
            <Footer />
            
          </Route>
          <Route
            exact
            path="/allMateriels"
            render={(props) => (
              <div >
                <Navbar />
                <Entete />
           <NavBar />
           
        <div className="row mother-container">
            <ProfilBody props={this.state.currentUser} {...props} />
            
            <Materiel/>
            </div>
            </div>
            )}
          ></Route>
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/carroussel" component={Carroussel}/>
          <Route exact path="/carroussel2" component={Carroussel2}/>
          <Route component={For0For} />
          
          
        </Switch>
      </div>
    );
  }
}
export default connect(null, { getEvents, filterEvents })(MainPage);
