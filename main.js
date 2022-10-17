//Service worker
if('serviceWorker' in navigator){//Si el serviceworker es soportado por el navegador
    console.log('Puedes usar los serviceworker');

    navigator.serviceWorker.register('./sw.js')
                           .then(res => console.log('ServiceWorker OK',res)) //promesa ejecutada 
                           .catch(err => console.log('No serviceWorker',err)); //error en la promesa
}else{//En caso de que no puede usarlo
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