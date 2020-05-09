class Spinner
{
    constructor()
    {
        // SETUP
        this.overlapThreshold = "50%"; 
        //this.boxwidth = $("#stepper").css("width").replace(/[^-\d\.]/g, ''); 
        this.boxwidth = 100; 
        this.maxValue = 19;
        this.minValue = 0;
        this.ContLenght = this.maxValue + this.boxwidth;
        this.startValue = 0;
        this.mainTimer;
        this.InitialTimer = 1000; //ms
        this.NewTimer = this.InitialTimer;
        this.minTimerValue = 50; //ms
        this.increment = 1.25;
        this.myval = this.startValue; 

        // TIMELINE
        this.anim = new TimelineMax();
        //this.initiate();
        this.createDraggable();

    } 
    moveForwards(container) { 
        this.anim.add(TweenMax.to(container, 0.5, { x: "-=" + this.boxwidth, ease: Expo.easeOut }));
    }
   
    moveBackwards(container){
        this.anim.add(TweenMax.to(container, 0.5, { x: "+=" + this.boxwidth, ease: Expo.easeOut }));
    }

    // GENERAL functions
    increaseValue(container) {
        this.increaseInputValue(container);
        this.anim.progress(1, false);
        this.moveForwards(container);
        this.anim.resume();
    }
    decreaseValue(container) {
        this.decreaseInputValue(container);
        this.anim.progress(1, false);
        this.moveBackwards(container);
        this.anim.resume();
    }
    increaseInputValue(container) {
        var myval = container.dataset.qty;
        if (myval <= this.maxValue) {
            myval++;
            container.dataset.qty=myval;
            console.log(myval);
        }
    }
    decreaseInputValue(container) {
        var myval = container.dataset.qty;
        if (myval >= this.minValue) {
            myval--;
            container.dataset.qty=myval;
          console.log(myval);
        }
    }
    createDraggable(){
        this.allBounds = document.querySelectorAll('.number_spinner_bound');
        
        [].forEach.call(this.allBounds, function(el){  
               
            var container = el.querySelector('.number_spinner_container');
            container.dataset.qty=this.myval;
            var stepperEl = el.querySelector('.stepper');
            var prev = el.querySelector('.number_spinner_prev');
            var next = el.querySelector('.number_spinner_next');
            var liHtml = '';
            for(var i = this.minValue; i <= this.maxValue; i++){ 
                liHtml +="<li class='item'>" + i + "</li>";
            }
            container.innerHTML=liHtml;
            TweenMax.to(container, 0, {left: -(this.boxwidth * this.startValue)});

            var stepper = Draggable.create(stepperEl, {
                type: "x",
                edgeResistance: 0.95,
                bounds: el })[
            0];

            /* stepper.addEventListener("dragend", this.onEndDragging(stepper,stepperEl,prev,next,container));
            stepper.addEventListener("drag", this.clickAndHold(stepper,stepperEl,prev,next,container)); */
                    
            //On click and hold on the Stepper
            $(stepperEl).on("touchstart mousedown", function () {
                //this.moveOnHold(stepper,stepperEl,prev,next,container);
            });

            //On click and hold on the Stepper
            $(stepperEl).on("touchstart mousedown", function () {
                //this.moveOnHold(stepper,stepperEl,prev,next,container);
            });
            
            $(stepperEl).on("touchend mouseup", function () {
               // this.resetTimer(stepper,stepperEl,prev,next,container);
            });
            console.log($(el).find('.number_spinner_next')); 
            next.addEventListener("click", function(){this.next(stepper,stepperEl,container); }.bind(this)); 
            prev.addEventListener("click", function(){this.prev(stepper,stepperEl,container); }.bind(this)); 

         }.bind(this)); 
    }
    next(stepper,stepperEl,container){ 
        var tlforward = new TimelineLite();
        tlforward.to(stepper, 0.1, { x: 10, ease: Expo.easeOut }, "-=0");
        tlforward.to(stepper, 0.5, { x: 0, ease: Back.easeOut.config(1.7) }, "-=0");
        var myval = container.dataset.qty;
        if (myval < this.maxValue) { 
            this.increaseValue(container);
        } else
        {
            this.disabled(stepperEl);
        }
    }
    prev(stepper,stepperEl,container){
        var tlforward = new TimelineLite();
        tlforward.to(stepper, 0.1, { x: -10, ease: Expo.easeOut }, "-=0");
        tlforward.to(stepper, 0.5, { x: 0, ease: Back.easeOut.config(1.7) }, "-=0");
        var myval = container.dataset.qty;
        if (myval > this.minValue) {
            this.decreaseValue(container);
        } else
        {
            this.disabled(stepperEl);
        }
    }
    disabled(stepperEl) {
        stepperEl.classList.add("disabled");
        setTimeout(function () {stepperEl.classList.remove("disabled");}, 100);
      };
    onEndDragging(stepper,stepperEl,prev,next,container) { 
        TweenMax.to(stepper, 1, { x: "0", ease: Elastic.easeOut.config(1, 0.75) }); // brings it back in position
        this.changeValueOnDraggingRelease(stepper,stepperEl,prev,next,container);
        this.resetTimer();  
        stepperEl.classList.add("disabled");
    }
    changeValueOnDraggingRelease(stepper,stepperEl,prev,next,container){ 
        this.anim.progress(1, false);
        if (stepper.hitTest(next, this.overlapThreshold) && this.myval < this.maxValue) {
            this.increaseValue(container); 
        } else if (stepper.hitTest(prev, this.overlapThreshold) && this.myval > this.minValue) {
            this.decreaseValue(container); 
        }
        this.anim.resume();
    
    }
    //Reset Timer
    resetTimer() {
        clearTimeout(this.mainTimer);
        this.NewTimer = this.InitialTimer; 
    } 
    clickAndHold(stepper,stepperEl,prev,next,container) {
        this.checkanddisable(stepper,stepperEl,prev,next,container);
    }
    checkanddisable(stepper,stepperEl,prev,next,container){
        if (stepper.hitTest(next, this.overlapThreshold) && this.myval >= this.maxValue) {
            stepperEl.classList.add("disabled");
        } else
        if (stepper.hitTest(prev, this.overlapThreshold) && this.myval <= this.minValue) {
            stepperEl.classList.add("disabled");
        }
    }
    moveOnHold = function (stepper,stepperEl,prev,next,container) {
        mainTimer = setTimeout(function () {
          this.ChangeNumberOnHold(stepper,stepperEl,prev,next,container);
          this.moveOnHold();
        }, NewTimer);
    }
    ChangeNumberOnHold(stepper,stepperEl,prev,next,container) {
        if (stepper.hitTest(next, this.overlapThreshold) && this.myval < this.maxValue) {
            stepperEl.classList.remove("disabled");
            this.increaseValue(container); 
          this.decreaseTimer();
        } else
      
        if (stepper.hitTest(prev, this.overlapThreshold) && this.myval > this.minValue) {
            stepperEl.classList.remove("disabled");
          this.decreaseValue(container);
          this.decreaseTimer();
        } else
        {
          NewTimer = InitialTimer;
        }
      }
}  
 


var decreaseTimer = function () {
    if (NewTimer > minTimerValue) {
        NewTimer = NewTimer / increment;
        console.log("timer: " + NewTimer);
    } else
    {
        NewTimer = minTimerValue;
        console.log("timer: " + NewTimer);
    }
};
 
  
 
  //Cursor Events --- only on desktop
  
  $("#stepper").mousemove(function (e) {
    $(".cursor").css({ left: e.pageX - 40, top: e.pageY - 40 });
  });
  
  $("#stepper").mousedown(function (e) {
    TweenMax.to(".cursor", 0.2, { opacity: 1, scale: 0.8, ease: Power2.easeOut });
  });
  
  $(document).mouseup(function (e) {
    var clicked = new TimelineMax();
    clicked.to(".cursor", 0.5, { scale: 3, ease: Power2.easeOut }, "+=0"),
    clicked.to(".cursor", 0.2, { opacity: 0, ease: Power2.easeOut }, "-=0.2"),
    clicked.to(".cursor", 0, { scale: 1, ease: Power2.easeOut }, "-=0");
  });
  