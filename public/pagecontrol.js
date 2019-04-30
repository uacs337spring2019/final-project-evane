/*
Evan Ellingsberg
CSC 337, Spring 2019
Final
Program: Final
This file handles the javascript for the html page and the fetching from the
sql database.
*/


(function(){
  "use strict";
  window.onload = function(){
    document.getElementById("home").addEventListener("click", gohome);
    document.getElementById("searchsubmit").addEventListener("click", gorecipes);
    document.getElementById("fcountry").addEventListener("click", inserttemp);
    document.getElementById("fingredient").addEventListener("click", inserttemp);
    document.getElementById("fstyle").addEventListener("click", inserttemp);
    document.getElementById("fall").addEventListener("click", inserttemp);
  };

  /**
    Function: inserttemp
    This function is used to take a command from the home page and insert it
    into the search box when clicked on.
  */
  function inserttemp(){
      let searchit =document.getElementById("searchbox");
      searchit.value = "";
      searchit.value=this.innerHTML;
  }

  /**
    Function: gohome
    This function is used to handle the home button being clicked.
    When clicked it changes div appearance and returns the user to the home
    page.
  */
  function gohome(){
    document.getElementById("searchbox").value = "";
    document.getElementById("midc").style.display = "inline-block";
    document.getElementById("rfound").innerHTML = "";
    document.getElementById("rlist").style.display = "none";
    document.getElementById("singlerecipe").style.display = "none";
  }

  /**
    Function: gorecipes
    This funciton is for when the enter button is clicked on the home page. It
    validates the input in the search box and if valid to the pattern of the
    search box, the input value is parsed and the command is executed by
    displaying the recipes based off of the command.
  */
  function gorecipes(){
    let cmd = document.getElementById("searchbox");
    let recipeslisted = document.getElementById("rfound");
    let patt = new RegExp(cmd.pattern);
    if((patt.test(cmd.value)) == true){
      document.getElementById("midc").style.display = "none";
      document.getElementById("rlist").style.display = "block";
      recipeslisted.innerHTML = "";
      let cmdparsed = cmd.value.split(":")[0];
      if(cmdparsed == "ALL"){
        allrecipes();
      }else if (cmdparsed == "COUNTRY") {
        getcountry();
      }else if(cmdparsed == "INGREDIENT"){
        getingredient();
      }else if(cmdparsed == "STYLE"){
        bystyle();
      }
    }
  }

  function showrecipe(){
    let url = "https://csc337-web.herokuapp.com/";
    let onname = this.innerHTML;
    document.getElementById("rfound").innerHTML = "";
    document.getElementById("rlist").style.display = "none";
    let onrecipe = document.getElementById("singlerecipe");
    onrecipe.style.display = "block";
    let curstyle = document.getElementById("rstyle");
    let curname = document.getElementById("title");
    let curcountry = document.getElementById("rcountry");
    let curingredientsl = document.getElementById("ingredientsl");
    curingredientsl.innerHTML = "";
    let cursteps = document.getElementById("steps");
    cursteps.innerHTML = "";
    fetch(url)
      .then(checkStatus)
      .then(function(responseText){
        let json = JSON.stringify(responseText);
        json = JSON.parse(json);
        let jrecipes = json["recipes"];
        let recipeindex;
        for(let i = 0; i < jrecipes.length; i ++){
          if(onname == jrecipes[i]["name"]){
            recipeindex = i;
            break;
          }
        }

        curstyle.src = jrecipes[recipeindex]["style"];
        curname.innerHTML = jrecipes[recipeindex]["name"];
        curcountry.innerHTML = jrecipes[recipeindex]["country"];
        let ifound = jrecipes[recipeindex]["ingredients"].split(".");
        let methodfound = jrecipes[recipeindex]["method"].split(".");
        for(let j = 0; j < ifound.length; j ++){
          let curingred = document.createElement("li");
          curingred.innerHTML = ifound[j].trim();
          curingredientsl.appendChild(curingred);
        }

        for(let k = 0; k < methodfound.length; k ++){
          let stepon = document.createElement("li");
          stepon.innerHTML = methodfound[k].trim();
          cursteps.appendChild(stepon);
        }

      })
      .catch(function(error){
        console.log(error);
      });
  }

  /**
    Function:
  */
  function getcountry(){
    let url = "https://csc337-web.herokuapp.com/";
    let recipeslisted = document.getElementById("rfound");
    let cmd = document.getElementById("searchbox");
    fetch(url)
      .then(checkStatus)
      .then(function(responseText){
        let json = JSON.stringify(responseText);
        json = JSON.parse(json);
        let recipesfound = json["recipes"];
        let x = 0;
        for(let i = 0; i < recipesfound.length; i ++){
          if(cmd.value.split(":")[1].trim() == recipesfound[i]["country"]){
            let curli = document.createElement("li");
            curli.innerHTML = recipesfound[i]["name"];
            curli.addEventListener("click", showrecipe);
            recipeslisted.appendChild(curli);
            x += 1;
          }
        }
        if(x == 0){
          for(let j = 0; j < recipesfound.length; j ++){
            let curli = document.createElement("li");
            curli.innerHTML = recipesfound[j]["name"];
            curli.addEventListener("click", showrecipe);
            recipeslisted.appendChild(curli);
          }
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }

  /**
    Function:
  */
  function getingredient(){
    let url = "https://csc337-web.herokuapp.com/";
    let recipeslisted = document.getElementById("rfound");
    let cmd = document.getElementById("searchbox");
    fetch(url)
      .then(checkStatus)
      .then(function(responseText){
        let json = JSON.stringify(responseText);
        json = JSON.parse(json);
        let recipesfound = json["recipes"];
        let x = 0;
        let regcmd = new RegExp(cmd.value.split(":")[1].trim());
        for(let i = 0; i < recipesfound.length; i ++){
          let currenting = recipesfound[i]["ingredients"].split(":");
          for(let l = 0; l < currenting.length; l ++){
            if(regcmd.test(currenting[l])){
              let curli = document.createElement("li");
              curli.innerHTML = recipesfound[i]["name"];
              curli.addEventListener("click", showrecipe);
              recipeslisted.appendChild(curli);
              x += 1;
              break;
            }
          }
        }
        if(x == 0){
          for(let j = 0; j < recipesfound.length; j ++){
            let curli = document.createElement("li");
            curli.innerHTML = recipesfound[j]["name"];
            curli.addEventListener("click", showrecipe);
            recipeslisted.appendChild(curli);
          }
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }

  /**
    Function:
  */
  function bystyle(){
    let url = "https://csc337-web.herokuapp.com/";
    let recipeslisted = document.getElementById("rfound");
    let cmd = document.getElementById("searchbox");
    fetch(url)
      .then(checkStatus)
      .then(function(responseText){
        let json = JSON.stringify(responseText);
        json = JSON.parse(json);
        let recipesfound = json["recipes"];
        let x = 0;
        let cmddata = cmd.value.split(":")[1].trim();
        let tocheck;
        if(cmddata == "keto"){
          tocheck = "ketosym.jpg";
        }else if(cmddata == "vegetarian"){
          tocheck = "vegsym.jpg";
        }else if(cmddata == "glutenfree"){
          tocheck = "glutensym.jpg";
        }
        for(let i = 0; i < recipesfound.length; i ++){
          if(tocheck == recipesfound[i]["style"]){
            let curli = document.createElement("li");
            curli.innerHTML = recipesfound[i]["name"];
            curli.addEventListener("click", showrecipe);
            recipeslisted.appendChild(curli);
            x += 1;
          }
        }
        if(x == 0){
          for(let j = 0; j < recipesfound.length; j ++){
            let curli = document.createElement("li");
            curli.innerHTML = recipesfound[j]["name"];
            curli.addEventListener("click", showrecipe);
            recipeslisted.appendChild(curli);
          }
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }

  /**
    Function: allrecipes
    This function handles the ALL command. It fetches every recipe from the
    sql data base and displays them on the recipe list page.
  */
  function allrecipes(){
    let url = "https://csc337-web.herokuapp.com/";
    let recipeslisted = document.getElementById("rfound");
    fetch(url)
      .then(checkStatus)
      .then(function(responseText){
        let json = JSON.stringify(responseText);
        json = JSON.parse(json);
        let recipesfound = json["recipes"];
        for(let i = 0; i < recipesfound.length; i ++){
          let curli = document.createElement("li");
          curli.innerHTML = recipesfound[i]["name"];
          curli.addEventListener("click", showrecipe);
          recipeslisted.appendChild(curli);
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }

  /**
  * Function: checkStatus
  * This function checks the status of fetching with Promise. If no errors are
  * thrown then the response from the fetch are returned. If there are errors
  * in the fetch then it is rejected and an error is returned.
  * Parameter: response is the response from trying to access the server.
  */
  function checkStatus(response){
    if(response.status == 404){
      return Promise.reject(new Error(response.status +
         ": Sorry, page could not be found!"));
    }
    if(response.status >= 200 && response.status < 300){
      return response.text();
    }else if(response.status == 410){
      return Promise.reject(new Error(response.status+":"+response.statusText));
    }else{
      return Promise.reject(new Error(response.status+": Could not recieve data"));
    }
  }
})();
