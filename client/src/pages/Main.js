import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Jumbotron } from "react-bootstrap";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import { Navbar, Nav, Modal, Button, Form } from "react-bootstrap";




const Main = () => {

  ///////style//////
  const jumbotronStyle = {
    textAlign: "center",
    backgroundImage: "url('assets/images/back.jpg')",
    padding: "8rem 2rem",
    fontFamily: "'Poppins', sans-serif"
  }
  const buttonStyle = {
    backgroundColor: "transparent",
    color: "green",
    border: 0
  }

  ////////states/////
  //store all users
  const [Users, setUsers] = useState([]);
   //store  users input
  const [Search, setSearch] = useState("");
   //store  albums for a specific user
  const [Albums, setAlbums] = useState([]);
  const [show, setShow] = useState(false);
  const [isAuthenticated, setAuth] = useState(false);
  const [userinfo, setUserinfo] = useState({});
  const [values, setValues] = useState({ SignInEmail: '', SignInUsername: '' });
  const [emptyfield, setEmptyfield] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormSignIn = e => {
    e.preventDefault();

    if (values.SignInEmail && values.SignInUsername) {

      API.getOneUserByEmail({
        email: values.SignInEmail,
        username: values.SignInUsername,
        users: Users
      })
        .then(res => {
          setAuth(true);
           setUserinfo(res.data);
          console.log("iiii"+res.data.userId)
          GetAuserAlbums(res.data.userId);
        })
        .catch(err => setEmptyfield(err.response.data));
    }
    else {
      setEmptyfield("Please fill in all fields")
    }


  };
  const handleLogout = () => {

    API.logOut();
    setAuth(false);
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  };

  useEffect(() => {
    API.getAllUsers()
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }
    , [])

  const handleChange = event => {
    setSearch(event.target.value)

  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (Search) {

      // get the username and return his id through filter
      const UserId = Users.filter((user) => {
        return user.username === Search
      })
      GetAuserAlbums(UserId[0].id);
      
    }
    // reset form
    setSearch("");
  };

  const handleFormSubmitAfterAuth = () => {
    GetAuserAlbums(userinfo.userId);
  }

  const GetAuserAlbums = (id) => {
    API.getAlbumsWithUserId(id)
      .then(res => setAlbums(res.data))
      .catch(err => console.log(err));

  }

  return (
    <>

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Photo Album</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            {isAuthenticated ? (<Button variant="primary" onClick={handleLogout} style={buttonStyle}>
              Log out
                </Button>) : (<Button variant="primary" onClick={handleShow} style={buttonStyle}>
                Log In
                 </Button>)}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Please Sign In</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text"
                      value={values.SignInUsername}
                      name="SignInUsername"
                      onChange={handleInputChange}
                      placeholder="Enter username" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="Email"
                      value={values.SignInEmail}
                      name="SignInEmail"
                      onChange={handleInputChange}
                      placeholder="Email" />
                  </Form.Group>

                  <div>{emptyfield}</div>

                  <Button variant="primary"
                    type="submit"
                    onClick={handleFormSignIn}>
                    Sign In
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron style={jumbotronStyle} >
        <h1>Collect Memories</h1>
        {isAuthenticated ?
          (<h1>Hi {userinfo.userName} :)</h1>)
          : (<SearchForm UsersInfo={Users} Search={Search} handleInputChange={handleChange} handleFormSubmit={handleFormSubmit} />)}
      </Jumbotron>
      <SearchResult Albums={Albums} />

    </>
  )
}


export default Main;