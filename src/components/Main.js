import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import Recipe from "./Recipe";
import savedRecipe from "./SavedRecipe";
import Ingredients from "./Ingredients";
import Popular from "./Popular";
import Blog from "./Blog";
import Article from "./Article"
import Test from "./Test";
import CreateArticle from "./CreateArticle";
import SavedRecipe from "./SavedRecipe";


class Main extends Component {
    constructor() {
        super();
        this.state = {
            clickedIngredient: "beef"
        }
    }

    //this is a callback function passing to ingredient, parameters will be set to selected ingredients
     handleClickIngredients = async (clickedIngredients) => {
         await this.setState({clickedIngredient: clickedIngredients})
     }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/ingredients">
                        <Ingredients parentCallback={this.handleClickIngredients}/>
                    </Route>
                    
                    <Route path="/recipes/:id?" component={Recipe} />

                    <Route path="/saved/recipes/:id?" component={SavedRecipe} />

                    <Route exact path="/blogs">
                        <Blog />
                    </Route>

                    <Route path="/articles/:id?" component={Article} />

                    <Route exact path="/create">
                        <CreateArticle />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;