

var NUM_EVENTS = 50;


function fill_eventselection_options() {
    
    selector = document.getElementById('eventindex');
    for (let i=0; i <= NUM_EVENTS; i++) {
        istr = i.toString()
        selector.options[selector.options.length] = new Option(istr, istr);
    }
}

function update() {

    var observable = document.getElementById("observable").value;
    var eventindex = document.getElementById("eventindex").value;
    var channels = document.getElementById("channels").value;

    var basepath = (
        "plots/" +
        observable +
        "-saliency_eventindex_" +        
        eventindex
    );
    if (channels == "averaged") {
        basepath = basepath + "_average.png"
    }
    else {
        basepath = basepath + ".png"
    }

    document.getElementById("saliency").src = basepath
    document.getElementById("smoothgrad").src = basepath.replace(/saliency/, "smoothgrad")
    document.getElementById("deconvolution").src = basepath.replace(/saliency/, "deconvolution")
    document.getElementById("inputxgradient").src = basepath.replace(/saliency/, "inputxgradient")
    document.getElementById("deeplift").src = basepath.replace(/saliency/, "deeplift")
    document.getElementById("guided_backprop").src = basepath.replace(/saliency/, "guided_backprop")
    document.getElementById("integrated_gradients").src = basepath.replace(/saliency/, "integrated_gradients")
    document.getElementById("guided_gradcam").src = basepath.replace(/saliency/, "guided_gradcam")
    document.getElementById("gradientshap").src = basepath.replace(/saliency/, "gradientshap")

    updatebuttons()
}

function updatebuttons() {

    var eventindex = document.getElementById("eventindex").value;
    eventindex = Number(eventindex);
    
    // Update button for prev event 
    prevbtn = document.getElementById("prevbutton");
    if (eventindex > 1 && prevbtn.classList.contains("disabled")) {
        prevbtn.classList.remove('disabled') 
    }
    if (eventindex == 1 && !prevbtn.classList.contains("disabled")) {
        prevbtn.classList.add('disabled');
    }
    // Update next event button
    nextbtn = document.getElementById("nextbutton");
    if (eventindex == NUM_EVENTS && !nextbtn.classList.contains("disabled")) {
        nextbtn.classList.add('disabled');
    }
    if (eventindex < NUM_EVENTS && nextbtn.classList.contains("disabled")) {
        nextbtn.classList.remove('disabled') 
    }

}
function nextevent() {

    var eventelement = document.getElementById("eventindex");
    index = Number(eventelement.value);
    index++;

    eventelement.value = index.toString();
    eventelement.text = index.toString();

    update()
}

function prevevent() {

    var eventelement = document.getElementById("eventindex");
    index = Number(eventelement.value);
    index--;

    eventelement.value = index.toString();
    eventelement.text = index.toString();

    update()
}