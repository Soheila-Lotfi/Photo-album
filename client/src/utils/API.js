import axios from "axios";

export default {
  
  getAllUsers: function () {
    return axios.get("https://jsonplaceholder.typicode.com/users");
  },


  getAlbumsWithUserId :function (id) {
    return axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
  },

  getphotosWithAlbumId :function (id) {
    return axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
  },
  
  //get A user info by Email and do the authentication
  getOneUserByEmail: function (userinformation) {
    return axios.post("/api/user/auth", userinformation);
  },

  //logout

  logOut: function () {

    return axios.post("/api/user/logout");
  }



};
