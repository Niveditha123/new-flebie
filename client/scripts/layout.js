var Fleb = Fleb || {};

window.Fleb= Fleb;
Fleb.OpenModal = function(e){
    var trigger = e.target.getAttribute("data-target");
    //trigger.classList.remove("fade-out");
    //trigger.classList.add("fade-in");
    var event = new Event('modalOpen');
    event.data={
        "id":trigger
    }
    console.log("here")
      document.body.dispatchEvent(event);
}
var callBtn = document.getElementById("callUs");
callBtn.addEventListener("click",Fleb.OpenModal);

Fleb.eventDispatcher = function(name,data){

    var event =new Event(name);
    event.data={
        "list":data
    }
      document.body.dispatchEvent(event);
  }


//var openCartBtn = document.getElementById("openCart");
//openCartBtn.addEventListener("click",Fleb.OpenModal);
