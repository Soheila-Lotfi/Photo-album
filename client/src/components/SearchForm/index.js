
import React from "react";
import "./style.css"



const SearchForm = (props) => {
    return (
        <form id="search">
            <div id="form-group">

                <input
                    value={props.Search}
                    onChange={props.handleInputChange}
                    name="Search"
                    className="form-control"
                    placeholder="Search By Name "
                    list="categories"

                />
                {props.Albums ? (<datalist id="categories">
                    {props.Albums.map(album => (
                        <option value={album.title} />
                    ))}
                </datalist>) : (<datalist id="categories">
                    {props.UsersInfo.map(user => (
                        <option value={user.username} />
                    ))}
                </datalist>)}

            </div>
            <button type="submit" onClick={props.handleFormSubmit} >
                Search
                </button>

        </form>
    );
}

export default SearchForm;
