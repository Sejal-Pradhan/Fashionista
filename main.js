// Page loader style
window.addEventListener("load", () => {
    document.querySelector(".js-page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".js-page-loader").style.display = "none";
    }, 600);
});




// testimonial slider
function testimonialSlider(){
    document.addEventListener("DOMContentLoaded", function(){
        const carouselOne=document.getElementById('carouselOne');
    if(carouselOne){
        // if element exists
        carouselOne.addEventListener('slide.bs.carousel', function () {
            const activeItem=this.querySelector(".active");
            console.log(activeItem);
            document.querySelector(".js-testimonial-img").src=activeItem.getAttribute("data-js-testimonial-img");
        })
    }    
    });
    
}
testimonialSlider();

// Course review
function coursePreviewVideo(){
    const courseModal = document.querySelector(".js-course-preview-modal");
    if(courseModal){
        // if element exists
        courseModal.addEventListener("shown.bs.modal", function(){
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime=0;
        });

        courseModal.addEventListener("hide.bs.modal", function(){
            this.querySelector(".js-course-preview-video").pause();
        });
    }
}
coursePreviewVideo();


// Style Switcher
function SSToggle(){
    const styleSwitcher = document.querySelector(".js-style-switcher"),
    SSToggle = document.querySelector(".js-style-switcher-toggler");
    SSToggle.addEventListener("click", function(){
        styleSwitcher.classList.toggle("open");
        this.querySelector("i").classList.toggle("fa-times");
        this.querySelector("i").classList.toggle("fa-cog");
    });
}
SSToggle();


//theme colors
function themeColors(){
    const colorTheme=document.querySelector(".js-color-style"),
    themeColors=document.querySelector(".js-theme-colors");
    themeColors.addEventListener("click", ({target}) => {
        console.log(target);
        if(target.classList.contains("js-theme-color-item")){
            localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
            setColor();
        }
    });

    function setColor(){
        let path= colorTheme.getAttribute("href").split("/");
        path=path.slice(0, path.length-1);
        colorTheme.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");

        if(document.querySelector(".js-theme-color-item.active")){
            document.querySelector(".js-theme-color-item.active").classList.remove("active");
        }
        document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active");
    }

    if(localStorage.getItem("color") != null){
        setColor();
    }
    else{
        const defaultColor=colorTheme.getAttribute("href").split("/").pop().split(".").shift();
        document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
    }
}
themeColors();


// dark-theme
function themeDarkmode(){
    const darkMode=document.querySelector(".js-dark-mode");
    darkMode.addEventListener("click", function(){
        if(this.checked){
            localStorage.setItem("theme-dark", "true");
        }
        else{
            localStorage.setItem("theme-dark", "false");
        }
        themeMode();
    });

    function themeMode(){
        if(localStorage.getItem("theme-dark") === "false"){
            document.body.classList.remove("t-dark");
        }
        else{
            document.body.classList.add("t-dark");
        }
    }

    if(localStorage.getItem("theme-dark") != null){
        themeMode();
    }
    if(document.body.classList.contains("t-dark")){
        darkMode.checked=true;
    }
}
themeDarkmode();


// Theme Glass-effect
function themeGlassEffect(){
    const glassTheme=document.querySelector(".js-glass-effect"),
    glassStyle=document.querySelector(".js-glass-style");
    glassTheme.addEventListener("click", function(){
        if(this.checked){
            localStorage.setItem("glass-effect", "true");
        }
        else{
            localStorage.setItem("glass-effect", "false");
        }
        glass();
    });

    function glass(){
        if(localStorage.getItem("glass-effect") === "true"){
            glassStyle.removeAttribute("disabled");
        }
        else{
            glassStyle.disabled=true;
        }
    }
    if(localStorage.getItem("glass-effect") !== null){
        glass();
    }
    if(!glassStyle.hasAttribute("disabled")){
        glassTheme.checked-true;
    }
}
themeGlassEffect();


// header menu
function headerMenu(){
    const menu=document.querySelector(".js-header-menu"),
    backdrop=document.querySelector(".js-header-backdrop"),
    menuCollapse=991;

    function toggleMenu(){
        menu.classList.toggle("open");
        backdrop.classList.toggle("active");
        document.body.classList.toggle("overflow-hidden");
    }

    document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
        item.addEventListener("click", toggleMenu);
    });

    // close the menu by clicking outside of it
    backdrop.addEventListener("click", toggleMenu);

    function collapse(){
        menu.querySelector(".active .js-sub-menu").removeAttribute("style");
        menu.querySelector(".active").classList.remove("active");
    }

    menu.addEventListener("click", (event) => {
        const { target }=event;

        if(target.classList.contains("js-toggle-sub-menu") && window.innerWidth <= menuCollapse){
            event.preventDefault();                   // prevent default anchor click behavior

            // if menu-item already expanded, collapse it and exit
            if(target.parentElement.classList.contains("active")){
                collapse();
                return;
            }

            // collapse the other expanded menu-item if exists
            if(menu.querySelector(".active")){
                collapse();
            }

            // expand new sub-menu
            target.parentElement.classList.add("active");
            target.nextElementSibling.style.maxHeight =
            target.nextElementSibling.scrollHeight + "px";

        }
    });

    // when resizing window
    window.addEventListener("resize", function(){
        if(this.innerWidth > menuCollapse && menu.classList.contains("open")){
            toggleMenu();
        }
        if(this.innerWidth > menuCollapse && menu.querySelector(".active")){
            collapse();
        }
    });
}
headerMenu();