if (screen.width <= 768) {
document.location = "mobile.html";
} else {
    $(document).ready(function() {

        // Ribbon and fading only applies to desktop version
        if (window.innerWidth >= 768)
        {
            var menu = $("#ribbon-menu");
            var ribbon = new Ribbon(Snap('#ribbon-menu'));

            var start = ribbon.states.start;
            var home = ribbon.states.home;

            // Menu button wiring
            $(".menu-button").bind("click", function(){

                if(menu.hasClass("closed")) {

                    ribbon.resizeSVG();
                    ribbon.updateRibbon();
                    ribbon.setState(home);

                    menu.removeClass("closed");
                    menu.addClass("open");

                } else if(menu.hasClass("open")) {

                    ribbon.resizeSVG();
                    ribbon.updateRibbon();
                    ribbon.deselectBlock(ribbon.currentState);
                    ribbon.setState(start);

                    menu.removeClass("open");
                    menu.addClass("closed");
                    
                } else {

                    menu.addClass("open");
                    ribbon.init();

                }

            });
        }       
    });
}



