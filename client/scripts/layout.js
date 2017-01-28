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


Fleb.getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
Fleb.findAnItemDeep = function(item,list,prop){
		var found={
			data:{},
			pos:0,
			in:false
		};
		for(var i=0;i<list.length;i++){
				if(item == list[i][prop[0]][prop[1]]){
					found.data=list[i];
					found.in=true;
					found.pos=i;
					break;
				}
			}
		return found;
}

Fleb.flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? Fleb.flatten(b) : b), []);
Fleb.showLoader = function(){
    var loader = document.getElementById("loader");
    loader.className="loader-block";
}
Fleb.hideLoader = function(){
    var loader = document.getElementById("loader");
    loader.className="loader-block hide";
}
//var openCartBtn = document.getElementById("openCart");
//openCartBtn.addEventListener("click",Fleb.OpenModal);
