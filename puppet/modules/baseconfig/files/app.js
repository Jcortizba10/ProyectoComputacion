const Consul = require('consul');
const express = require('express');

const SERVICE_NAME = 'mymicroservice'; // Nombre del servicio para clienteUbuntu
const SERVICE_ID = 'c' + process.argv[2]; // Identificación del servicio
const SCHEME = 'http';
const HOST = '192.168.100.2'; // IP de clienteUbuntu
const PORT = process.argv[2] * 1; // Puerto especificado en la línea de comandos
const PID = process.pid; // PID del proceso

/* Inicialización del servidor */
const app = express();
const consul = new Consul();

// Endpoint para el chequeo de salud del servicio
app.get('/health', function (req, res) {
    console.log('Health check!');
    res.end("Ok.");
});

// Nuevo endpoint principal para mostrar un mensaje personalizado
app.get('/', (req, res) => {
    res.send('¡Hola, Este es el servidor clienteUbuntu!');
    console.log('GET /', Date.now());
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, function () {
    console.log('Servicio iniciado en: ' + SCHEME + '://' + HOST + ':' + PORT + '!');
});

// Configuración del chequeo de salud para Consul
var check = {
    id: SERVICE_ID,
    name: SERVICE_NAME,
    address: HOST,
    port: PORT,
    check: {
        http: SCHEME + '://' + HOST + ':' + PORT + '/health',
        ttl: '5s',
        interval: '5s',
        timeout: '5s',
        deregistercriticalserviceafter: '1m'
    }
};

// Registro del servicio en Consul
consul.agent.service.register(check, function (err) {
    if (err) throw err;
    console.log('Servicio registrado en Consul con ID: ' + SERVICE_ID);
});

