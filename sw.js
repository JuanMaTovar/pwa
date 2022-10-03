//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_idgs_pwa';
//Archivos en la app que almacenare en el cache
var urlsToCache = [
    './',
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
//Evento install
//Instalación del SW y guardar en cache los recursos estáticos
/*self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                return cache.addAll(urlsToCache)
                            .then(() => {
                                self.skipWaiting();
                            });
                           
              })
              .catch(err => console.log('No se ha registrado el cache', err))
    );
});*/
/******** */
self.addEventListener('install', e =>{
    const cacheS = caches.open(CACHE_NAME)
        .then(cache =>{
            cache.addAll(urlsToCache)
        })
        .catch(err => console.log('No se ha registrado',err));
 e.waitUntil(Promise.resolve(cacheS));
});

//Evento activate
//Que la app funcione sin conexión
self.addEventListener('activate',e =>{
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //Borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                )
              })
              .then(()=>{
                //Activar cache en el dispositivo del usuario
                self.clients.claim();
              })
    );
});
// Evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request) //Busca si hay un cache que corresponda al que se está buscando
              .then(res => {
                if(res){
                    //devuelvo los datos desde cache
                    return res;
                }
                //En caso de que no haya datos en el cache la recupero desde el servidor
                return fetch(e.request);
              })
    );
});