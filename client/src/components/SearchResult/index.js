
import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import API from "../../utils/API";
import PhotoCarousel from "../PhotoCarousel";
import "./style.css";




const SearchResult = (props) => {
    const [show, setShow] = useState(false);
    const [AlbumId, setAlbumId] = useState("");
    const [Photos, setPhotos] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        // getphotos("1");
        // get the albumId and return its photo through filter
        setAlbumId(e.target.id);
        // getphotos();

    };

    // update the albumId when it changes
    useEffect(() => {

        //get all the photos for a specific album using album id
        API.getphotosWithAlbumId(AlbumId)
            .then(res => setPhotos(res.data))
            .catch(err => console.log(err));
    }, [AlbumId])


    return (
        <>
            <div id="results">
               
                <ul id="albums">
                     {props.Albums.map(album => (

                    <li key={album.id}>
                        <p className="lists" id={album.id} onClick={handleShow}>{album.title} </p>

                    </li>
                ))}
                  </ul>
                </div>


            <Modal show={show} onHide={handleClose}>
               
                <Modal.Body style={{ height: "400px", padding:"0" }}>
                   
                    <PhotoCarousel Photos={Photos} style={{width:"100%", height:"100%"}} />

                </Modal.Body>
               
            </Modal>

        </>


    );
}

export default SearchResult;
