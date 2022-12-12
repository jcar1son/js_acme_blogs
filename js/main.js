//1. Creates the function and sets the intial values
function createElemWithText(htmlElement = "p", newTextCon = "", newClassN)
{

//creates a new element using the htmlElement
let newElement = document.createElement(htmlElement);

//sets the text content of the new variable to just the text content
newElement.textContent = newTextCon;

//if there is a specific class name, then it will set it to the newElement
if (newClassN){

newElement.className = newClassN;

}

//now we return the new element
return newElement;

}


//2.
function createSelectOptions(userData){

// Returns undefined if no parameter received

let arr = [];

if (!userData){

    return undefined;

}

//Loops through the users data
for (user of userData){
    //Creates an option element for each user with document.createElement()

    var option = document.createElement('option');

    //Assigns the user.id to the option.value
    option.value = user.id;

    //Assigns the user.name to the option.textContent
    option.innerHTML = user.name;

    arr.push(option);
}
//Return an array of options elements
return arr;

}

//3.
function toggleCommentSection(postID){


//if there is no postID then it returns undefined
if (!postID){

        return undefined;
    
}
//Selects the section element with the data-post-id attribute equal to the postId received as a parameter

let sectionElem = document.querySelector(`section[data-post-id = "${postID}"]`);

//Use code to verify the section exists before attempting to access the classList property
if (sectionElem){

    //Toggles the class 'hide' on the section element
    sectionElem.classList.toggle('hide');

}

//Return the section element
return sectionElem;

}

//4.
function toggleCommentButton(postID){

    if (!postID){

        return undefined;
    
    }   
    
    //Selects the button with the data-post-id attribute equal to the postId received as a parameter
    let buttonElem = document.querySelector(`button[data-post-id = "${postID}"]`);

    //if postID passed a null value returns the null value
    //Otherwise changes the text on the buttons
    if (buttonElem != null) {
        //If the button textContent is 'Show Comments' switch textContent to 'Hide Comments'
        if (buttonElem.textContent === 'Show Comments' ){
         buttonElem.textContent = 'Hide Comments';}
        
        //If the button textContent is 'Hide Comments' switch textContent to 'ShowComments'
         else{
         buttonElem.textContent = 'Show Comments';
         }
 
 
     }

     // Return the button element
     return buttonElem;
 
 }


//5. didnt check cheat sheet
function deleteChildElements(pElement){ 

//Receives a parentElement as a parameter
if(!pElement?.tagName){

    return undefined;
}

//Define a child variable as parentElement.lastElementChild
let child = pElement.lastElementChild;

//Use parentElement.removeChild to remove the child in the loop
while(child){ 

      // Reassign child to parentElement.lastElementChild in the loop
        pElement.removeChild(child);

        child = pElement.lastElementChild;

    }


// Return the parentElemen
return pElement;

}

//6.

const addButtonListeners = () => {

    //Selects all buttons nested inside the main element

    let main = document.querySelector('main');

    let selectedButtons = main.querySelectorAll('button');

    //If buttons exist:
    // Loop through the NodeList of buttons
    // Gets the postId from button.dataset.postId
    // Adds a click event listener to each button (reference addEventListener)
    // The listener calls an anonymous function (see cheatsheet)
    // Inside the anonymous function: the function toggleComments is called with the
    //event and postId as parameters
    if(selectedButtons){

        for (let i = 0; i < selectedButtons.length; i++){

                let currButton = selectedButtons[i];

                let id = currButton.dataset.postId;

                currButton.addEventListener('click', function(event){

                toggleComments(event, id), false;

              });

        }

        return selectedButtons;
    }
    

}

//7.

const removeButtonListeners= () =>{

    //Selects all buttons nested inside the main element
    let main = document.querySelector('main');

    let selectedButtons = main.querySelectorAll('button');

    //Loops through the NodeList of buttons
  // Gets the postId from button.dataset.id
  // Removes the click event listener from each button (reference removeEventListener)
  // Refer to the addButtonListeners function as this should be nearly identical

    if(selectedButtons){

        for (let i = 0; i < selectedButtons.length; i++){

                let currButton = selectedButtons[i];

                let id = currButton.dataset.id;

                currButton.removeEventListener('click', function(event){

                    toggleComments(event, id), false;

                });

        }
        
        //returns the end result
        return selectedButtons;
    }
    

}


function createComments(commentData){

    if(!commentData){

        return undefined;

    }

    //Creates a fragment element with document.createDocumentFragment()

    let fragElement = document.createDocumentFragment();

    //Loop through the comments
    for(let i = 0; i < commentData.length; i++){

        let commentIndex = commentData[i];
        
        let article = document.createElement('article');

        let heading = createElemWithText('h3', commentIndex.name);

        let para1 = createElemWithText('p', commentIndex.body);

        let para2 = createElemWithText('p', `From: ${commentIndex.email}`);

        article.appendChild(heading);

        article.appendChild(para1);

        article.appendChild(para2);

        fragElement.appendChild(article);

    }

    return fragElement;

}

//9.
/*
Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the
select menu
g. Return the selectMenu element

*/
function populateSelectMenu(userData){

if (!userData){

    return undefined;

}

let selectMenu = document.querySelector('#selectMenu');

let userOptions = createSelectOptions(userData);

for (let i = 0; i < userOptions.length; i++){

    let data = userOptions[i];

    selectMenu.append(data);

}

return selectMenu;

}

//10. forgot space

/*
 Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data

*/

const getUsers = async()=> {

    let data;

try{

    data = await fetch("https://jsonplaceholder.typicode.com/users");

}

catch(error){

    return undefined;

}

return await data.json();

}

//11. forgot slash

/*
Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data
*/

const getUserPosts = async(userID)=> {

    if(!userID){

        return undefined;
    }

    let data;

try{

    data = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`);

}

catch(error){

    return undefined;

}

return await data.json();

}



//12.

/*

a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data

*/ 

const getUser = async(userID)=> {


    if(!userID){

        return undefined;
    }

    let data;

try{

    data = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);

}

catch(error){

    return undefined;

}

return await data.json();

}



//13.

/*

a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data


*/

const getPostComments = async(postID)=> {


    if(!postID){

        return undefined;
    }

    let data;

try{

    data = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`);

}

catch(error){

    return undefined;

}

return await data.json();

}


//14.

/*

a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element

*/

const displayComments = async (postId) => {

    if (!postId){

      return undefined;

    }

    let sectionE = document.createElement('section');

    sectionE.dataset.postId = postId;

    sectionE.classList.add('comments', 'hide');

    const com = await getPostComments(postId);

    const fragE = createComments(com);

    sectionE.append(fragE);

    return sectionE;


}

//15.

/*

a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:
g. Create an article element with document.createElement()
h. Create an h2 element with the post title
i. Create an p element with the post body
j. Create another p element with text of `Post ID: ${post.id}`
k. Define an author variable equal to the result of await getUser(post.userId)
l. Create another p element with text of `Author: ${author.name} with
${author.company.name}`
m. Create another p element with the author’s company catch phrase.
n. Create a button with the text 'Show Comments'
o. Set an attribute on the button with button.dataset.postId = post.id
p. Append the h2, paragraphs, button, and section elements you have created to
the article element.
q. Create a variable named section equal to the result of await
displayComments(post.id);
r. Append the section element to the article element
s. After the loop completes, append the article element to the fragment
t. Return the fragment element


*/ 

const createPosts = async (jsonP) => {

if(!jsonP){

  return undefined;

}

let fragE = document.createDocumentFragment();

for(let i = 0; i < jsonP.length; i++){

  let jPost = jsonP[i];

  let article = document.createElement('article');

  let sectionCom = await displayComments(jPost.id);

  let author = await getUser(jPost.userId);

  let heading2 = createElemWithText('h2', jPost.title);

  let para = createElemWithText('p', jPost.body);

  let para2 = createElemWithText('p', `Post ID: ${jPost.id}`);

  let para3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);

  let para4 = createElemWithText('p', `${author.company.catchPhrase}`);

  let button = createElemWithText('button', 'Show Comments');

  button.dataset.postId = jPost.id;

  article.append(heading2, para, para2, para3, para4, button, sectionCom);

  fragE.append(article);

}

return fragE;


}


//16.

/*

a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable

*/ 


const displayPosts = async (postData) =>{

  let main = document.querySelector('main');

  let mainElement = postData;

  if(postData){

    mainElement = await createPosts(postData);

  }

  else{

    mainElement = document.querySelector('main p');

  }

  main.append(mainElement);

  return mainElement;
}


//17.

/*

a. Dependencies: toggleCommentSection, toggleCommentButton
b. Receives 2 parameters: (see addButtonListeners function description)
i. The event from the click event listener is the 1st param
ii. Receives a postId as the 2nd parameter
c. Sets event.target.listener = true (I need this for testing to be accurate)
d. Passes the postId parameter to toggleCommentSection()
e. toggleCommentSection result is a section element
f. Passes the postId parameter to toggleCommentButton()
g. toggleCommentButton result is a button
h. Return an array containing the section element returned from
toggleCommentSection and the button element returned from
toggleCommentButton: [section, button]


*/


function toggleComments(event, postId){

if(!event || !postId){

  return undefined;

}

event.target.listener = true;

let comSection = toggleCommentSection(postId);

let comButton = toggleCommentButton(postId);

return [comSection, comButton];

}


//18.

/*

a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
addButtonListeners
b. Is an async function
c. Receives posts JSON data as a parameter
d. Call removeButtonListeners
e. Result of removeButtonListeners is the buttons returned from this function
f. Call deleteChildElements with the main element passed in as the parameter
g. Result of deleteChildElements is the return of the main element
h. Passes posts JSON data to displayPosts and awaits completion
i. Result of displayPosts is a document fragment
j. Call addButtonListeners
k. Result of addButtonListeners is the buttons returned from this function
l. Return an array of the results from the functions called: [removeButtons, main,
fragment, addButtons]

*/ 

const refreshPosts = async (postData) => {

if (!postData){

return undefined;

}

let removeButtons = removeButtonListeners();

let mainChild = deleteChildElements(document.querySelector('main'));

let fragP = await displayPosts(postData);

let addButtons = addButtonListeners();

return [removeButtons, mainChild, fragP, addButtons];

}

//19.

/*

a. Dependencies: getUserPosts, refreshPosts
b. Should be an async function
c. Automatically receives the event as a parameter (see cheatsheet)
d. Disables the select menu when called into action (disabled property)
e. Defines userId = event.target.value || 1; (see cheatsheet)
f. Passes the userId parameter to await getUserPosts
g. Result is the posts JSON data
h. Passes the posts JSON data to await refreshPosts
i. Result is the refreshPostsArray
j. Enables the select menu after results are received (disabled property)
k. Return an array with the userId, posts and the array returned from refreshPosts:
[userId, posts, refreshPostsArray]


*/ 

const selectMenuChangeEventHandler = async (event) => {

  if (!event){

    return undefined;
    
    }

let userID = event?.target?.value || 1;

let postData = await getUserPosts(userID);

let postArray = await refreshPosts(postData);

return[userID, postData, postArray];

}

//20.

/*

a. Dependencies: getUsers, populateSelectMenu
b. Should be an async function
c. No parameters.
d. Call await getUsers
e. Result is the users JSON data
f. Passes the users JSON data to the populateSelectMenu function
g. Result is the select element returned from populateSelectMenu
h. Return an array with users JSON data from getUsers and the select element
result from populateSelectMenu: [users, select]

*/ 

const initPage = async() =>{

let users = await getUsers();

let selectMenu = populateSelectMenu(users);

return[users, selectMenu];

}

//21.

/*

a. Dependencies: initPage, selectMenuChangeEventHandler
b. Call the initPage() function.
c. Select the #selectMenu element by id
d. Add an event listener to the #selectMenu for the “change” event
e. The event listener should call selectMenuChangeEventHandler when the change
event fires for the #selectMenu
f. NOTE: All of the above needs to be correct for you app to function correctly.
However, I can only test if the initApp function exists. It does not return anything.

*/ 

function initApp(){

initPage();

let selectElement = document.getElementById('selectMenu');

selectElement.addEventListener('change', selectMenuChangeEventHandler, false);


}

/*

1. Add an event listener to the document.
2. Listen for the “DOMContentLoaded” event.
3. Put initApp in the listener as the event handler function.
4. This will call initApp after the DOM content has loaded and your app will be started.

*/ 

document.addEventListener('DOMContentLoaded', initApp, false);




//userdata for the second function
userData = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      },
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
      }
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "address": {
        "street": "Hoeger Mall",
        "suite": "Apt. 692",
        "city": "South Elvis",
        "zipcode": "53919-4257",
        "geo": {
          "lat": "29.4572",
          "lng": "-164.2990"
        }
      },
      "phone": "493-170-9623 x156",
      "website": "kale.biz",
      "company": {
        "name": "Robel-Corkery",
        "catchPhrase": "Multi-tiered zero tolerance productivity",
        "bs": "transition cutting-edge web services"
      }
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "address": {
        "street": "Skiles Walks",
        "suite": "Suite 351",
        "city": "Roscoeview",
        "zipcode": "33263",
        "geo": {
          "lat": "-31.8129",
          "lng": "62.5342"
        }
      },
      "phone": "(254)954-1289",
      "website": "demarco.info",
      "company": {
        "name": "Keebler LLC",
        "catchPhrase": "User-centric fault-tolerant solution",
        "bs": "revolutionize end-to-end systems"
      }
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
      "address": {
        "street": "Norberto Crossing",
        "suite": "Apt. 950",
        "city": "South Christy",
        "zipcode": "23505-1337",
        "geo": {
          "lat": "-71.4197",
          "lng": "71.7478"
        }
      },
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org",
      "company": {
        "name": "Considine-Lockman",
        "catchPhrase": "Synchronised bottom-line interface",
        "bs": "e-enable innovative applications"
      }
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "username": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",
      "address": {
        "street": "Rex Trail",
        "suite": "Suite 280",
        "city": "Howemouth",
        "zipcode": "58804-1099",
        "geo": {
          "lat": "24.8918",
          "lng": "21.8984"
        }
      },
      "phone": "210.067.6132",
      "website": "elvis.io",
      "company": {
        "name": "Johns Group",
        "catchPhrase": "Configurable multimedia task-force",
        "bs": "generate enterprise e-tailers"
      }
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "username": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",
      "address": {
        "street": "Ellsworth Summit",
        "suite": "Suite 729",
        "city": "Aliyaview",
        "zipcode": "45169",
        "geo": {
          "lat": "-14.3990",
          "lng": "-120.7677"
        }
      },
      "phone": "586.493.6943 x140",
      "website": "jacynthe.com",
      "company": {
        "name": "Abernathy Group",
        "catchPhrase": "Implemented secondary concept",
        "bs": "e-enable extensible e-tailers"
      }
    },
    {
      "id": 9,
      "name": "Glenna Reichert",
      "username": "Delphine",
      "email": "Chaim_McDermott@dana.io",
      "address": {
        "street": "Dayna Park",
        "suite": "Suite 449",
        "city": "Bartholomebury",
        "zipcode": "76495-3109",
        "geo": {
          "lat": "24.6463",
          "lng": "-168.8889"
        }
      },
      "phone": "(775)976-6794 x41206",
      "website": "conrad.com",
      "company": {
        "name": "Yost and Sons",
        "catchPhrase": "Switchable contextually-based project",
        "bs": "aggregate real-time technologies"
      }
    },
    {
      "id": 10,
      "name": "Clementina DuBuque",
      "username": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",
      "address": {
        "street": "Kattie Turnpike",
        "suite": "Suite 198",
        "city": "Lebsackbury",
        "zipcode": "31428-2261",
        "geo": {
          "lat": "-38.2386",
          "lng": "57.2232"
        }
      },
      "phone": "024-648-3804",
      "website": "ambrose.net",
      "company": {
        "name": "Hoeger LLC",
        "catchPhrase": "Centralized empowering task-force",
        "bs": "target end-to-end models"
      }
    }
  ]







