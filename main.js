//Service worker
if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceworker');

    navigator.serviceWorker.register('./sw.js')
                           .then(res => console.log('ServiceWorker OK',res))
                           .catch(err => console.log('No serviceWorker',err));
}else{
    console.log('No puedes usar los serviceWorkers')
}

//Scroll suavizado
$(document).ready(function(){
    
    $("#menu a").click(function(e){
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;
    });
})