//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_idgs';

//archivos a guardar en el cache
var urlsToCache = [
    './', //Todo lo del directorio actual
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

//Evento install del SW
//Instalación del SW y almacenar en cache los recursos estaticos que definimos anteriormente
//la variable self hace referencia al SW
self.addEventListener('install', e =>{
    e.waitUntil(//Esperar a que abra la cache
        caches.open(CACHE_NAME)//abrimos la cache, regresa una promesa
            .then(cache => {
                cache.addAll(urlsToCache)//Regresamos los elementos almacenados en el cache
                    .then(() =>{
                        self.skipWaiting();//Espera a que se llene la cache
                    })
                    
            })
            .catch(err =>{
                console.log('No se ha registrado el cache', err);
            })
    )
});

//Evento activate
//Este activa el SW y una vez que se active trabaje offline
self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME] //vamos a guardar todos los elementos que vienen del cache original
    //primero limpiamos el cache para quitar elementos que no se necesiten o sean redundantes
    e.waitUntil(
        caches.keys() //El keys lo que hace es recoger todos los elementos que hay del cache
            .then(cacheNames => {
                return Promise.all(
                    //map() nos permite recorrer un array
                    cacheNames.map(cacheName =>{
                        //indexOf es para buscar dentro del cache
                        //Lo siguiente es buscar un elemento y si no se encuentra borrarlo de la cache o si es redundante
                        if(cacheWhitelist.indexOf(cacheName)=== -1){
                            //Borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            //Activar cache
            .then(() => {
                self.clients.claim(); //Activa la cache actual WitheList
            })
    );
})
// Evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request) //Busca la información en el cache
              .then(res => {
                if(res){
                    //Si se encuentra en el cache
                    //devuelvo los datos desde cache
                    return res;
                }
                //En caso de que no se encuentre en el cache la recupero desde el servidor
                return fetch(e.request);
              })
    );
});
