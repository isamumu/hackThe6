import React, {useEffect, useState} from 'react';
import {ID, TOKEN_KEY, URL} from "../constants";
import Axios from "axios";

import {Card, ListGroup,ListGroupItem, Button, Form, Alert,  Badge, Modal, FormControl} from "react-bootstrap";
import { render } from '@testing-library/react';


const Recipe_content = ({recipes, title, calories, image, ingredients, dietLabels, healthLabels, url, source}) => {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // since we use the local cache i did not find an efficient way to clear the caceh
    // therefore instead, please uncomment the below line and run the server to clear the cache and comment it back later
    //localStorage.clear();
    const handleRecipesSave = (recipe) => {
        // if we handle the recipe card please show the save button
        setShowAlert(true); // to be used below 
        console.log("Save button", recipe)
        
        var myUrl = url;

        // save the recipe into the localstorage
        localStorage.setItem(localStorage.length, JSON.stringify(myUrl.replace(/['"]+/g, '')));
        console.log("YES", myUrl.replace(/['"]+/g, '')); // for testing functionality in console
       
    }

    console.log("number of Ingredients: ", ingredients.length)
    
    return (
        /*
        here i use Bootstrap-React cards to display the recipes
        Of the options i had, i felt this would be the most visually pleasing

        Essentially, the logic is that when the user clicks the ingredients button, it will
        trigger a click event which will produce a small window listing out all of the required ingredients

        Similarly, handleRecipeSave is an event triggered when the user clicks the save button for a certain recipe.
        This will forward the recipe's website link to the local cache, where the user can click to visit the recipe's
        original website
        */
        <div>
            <Card style={{ width: '25rem' }}> 
            <Card.Img variant="top" src={image}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <Badge pill variant="success">Labels</Badge> {healthLabels[0]}, {healthLabels[1]}
                </ListGroupItem>
                <ListGroupItem>
                    <Badge pill variant="success">Diet</Badge> {dietLabels}
                </ListGroupItem>
                <ListGroupItem>
                    <Badge pill variant="success">Calories</Badge> {(calories / 10).toFixed(0)}
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Button variant="primary" onClick={handleShow}>
                    Ingredients
                </Button>{' '}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ol>
                        {ingredients.map(ingredient =>(
                            <li>{ingredient.text}</li>
                        ))}
                    </ol>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="info" href = {url} target="_blank">
                    check me out
                </Button>{' '}
                
                <Button variant="info" onClick={ () => handleRecipesSave(recipes)}>
                    Save
                </Button> 

            </Card.Body>
            </Card>        
            <>
            <Alert show={showAlert} variant="success">
                <Alert.Heading>Saved!! </Alert.Heading>
                    Check "Saved Recipes" for list
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowAlert(false)} variant="outline-success">
                        Close me 
                    </Button>
                </div>
            </Alert>

            </>
        
        </div>
        
    );
};

render();

export default Recipe_content;