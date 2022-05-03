

var NUM_EVENTS = 50;

const methods = new Map();
methods.set("saliency", "Saliency");
methods.set("smoothgrad", "SmoothGrad");
methods.set("deconvolution", "Deconvolution");
methods.set("inputxgradient", "Input x gradients");
methods.set("deeplift", "DeepLIFT");
methods.set("guided_backprop", "Guided Backpropagation");
methods.set("integrated_gradients", "Integrated gradients");
methods.set("guided_gradcam", "Guided Grad-CAM");
methods.set("gradientshap", "GradientSHAP");


function fill_eventselection_options() {
    
    selector = document.getElementById('eventindex');
    for (let i=0; i <= NUM_EVENTS; i++) {
        istr = i.toString();
        selector.options[selector.options.length] = new Option(istr, istr);
    }
}

function blind() {

    btn = document.getElementById("blind_switch");
    label = document.getElementById("blind_switch_label");
    show_btn = document.getElementById("show_caption");
    var enabled = btn.classList.contains("switch_on");
    
    // Disable
    if (enabled) {
        btn.classList.remove("switch_on");
        label.innerHTML = "Blinding off";
        show_btn.classList.add("disabled");
        enabled = false;
    }
    // Enable
    else {
        btn.classList.add("switch_on");
        label.innerHTML = "Blinding on";
        show_btn.classList.remove("disabled");
        enabled = true;
    }

    update();

}

function show_caption() {

    var btn = document.getElementById("show_caption");
    var visibility = "visible";

    // Show caption
    if (!btn.classList.contains("active")) {
        btn.classList.add("active");
        visibility = "visible";
    }
    else {
        btn.classList.remove("active");
        visibility = "hidden";
    }

    for (var i = 0; i < methods.size; i++) {
        var caption = document.getElementById("fig" + String(i) + "caption");
        caption.style.visibility = visibility;
    }
}

function update() {

    var observable = document.getElementById("observable").value;
    var eventindex = document.getElementById("eventindex").value;
    var channels = document.getElementById("channels").value;
    var model = document.getElementById("model").value;
    var blinded = document.getElementById("blind_switch").classList.contains("switch_on");
    // console.log("blinded: ", blinded)

    var basepath = (
        "plots/" +
        model + "/" +
        observable +
        "-METHOD_eventindex_" +        
        eventindex
    );
    if (channels == "averaged") {
        basepath = basepath + "_average.png";
    }
    else {
        basepath = basepath + ".png";
    }

    // Set path to images
    var imgsources = [];
    for (const [name, title] of methods) {
        imgsources.push(basepath.replace(/METHOD/, name));
    }

    // Randomise order, if running blinded 
    var ordering = [];
    for (var i = 0; i < methods.size; i++) {ordering.push(i)}

    if (blinded) {
        shuffle(ordering);
    }

    // Update plots
    for (var i = 0; i < methods.size; i++) {
        var plot = document.getElementById("fig" + String(i));
        var caption = document.getElementById("fig" + String(i) + "caption");
        var index = ordering[i];
        plot.src = imgsources[index];
        caption.innerHTML = methods.get(Array.from(methods.keys())[index]);
        if (blinded) {caption.style.visibility = "hidden";}
        else {caption.style.visibility = "visible";}
    }

    updatebuttons()
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function updatebuttons() {

    var eventindex = document.getElementById("eventindex").value;
    eventindex = Number(eventindex);
    
    // Update button for prev event 
    prevbtn = document.getElementById("prevbutton");
    if (eventindex > 1 && prevbtn.classList.contains("disabled")) {
        prevbtn.classList.remove("disabled");
    }
    if (eventindex == 1 && !prevbtn.classList.contains("disabled")) {
        prevbtn.classList.add("disabled");
    }
    // Update next event button
    nextbtn = document.getElementById("nextbutton");
    if (eventindex == NUM_EVENTS && !nextbtn.classList.contains("disabled")) {
        nextbtn.classList.add("disabled");
    }
    if (eventindex < NUM_EVENTS && nextbtn.classList.contains("disabled")) {
        nextbtn.classList.remove("disabled") 
    }

    // Turn off show caption button
    var show_caption_btn = document.getElementById("show_caption");
        if (show_caption_btn.classList.contains("active")) {
            show_caption_btn.classList.remove("active");
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
