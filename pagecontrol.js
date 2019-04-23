/*
Evan Ellingsberg
CSC 337, Spring 2019
Final
Program: Final

*/

"use strict";

(function(){

  window.onload = function(){
    document.getElementById("home").onclick = gohome;
    document.getElementById("searchsubmit").onclick = gorecipes;
  };

  function gohome(){
    document.getElementById("searchbox").value = "";
    document.getElementById("midc").style.display = "inline-block";
    document.getElementById("rfound").innerHTML = "";
    document.getElementById("rlist").style.display = "none";
    document.getElementById("singlerecipe").style.display = "none";
  }

  function gorecipes(){
    let cmd = document.getElementById("searchbox").pattern;
    document.getElementById("midc").style.display = "none";
    document.getElementById("rlist").style.display = "block";
    console.log(cmd);
  }
})();
