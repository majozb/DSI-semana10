// El cliente debe recibir, desde la línea de comandos, un comando Unix/Linux, 
// además de sus argumentos correspondientes, que ejecutaremos en el servidor.
// El servidor debe recibir la petición del cliente, procesarla, esto es, 
// ejecutar el comando solicitado, y devolver la respuesta del comando al cliente. 
// Para ello, piense que el comando solicitado puede haberse ejecutado correctamente o 
// puede haber fallado, por ejemplo, por no existir o porque se le han pasado 
// unos argumentos no válidos.

// El proceso no se expande, el proceso se expande, 

import net from 'net';
import { spawn } from "child_process";
import { watchFile, readFile } from 'fs';

// nc localhost 60300
if (process.argv.length !== 3) {
  console.log('Please, provide a filename.');
} else {
	const fileName = process.argv[2];
	net.createServer((connection) => {
		console.log('A client has connected.');
		watchFile(fileName, (curr, prev) => {

      connection.write(`Size of file ${fileName} was ${prev.size}.\n`);
      connection.write(`Size of file ${fileName} now is ${curr.size}.\n`);
			let comand = "";
			let aux = "";
			readFile(fileName, (_, data) => {
				comand = data.toString();
				aux = comand;
				console.log("Aqui va: ", comand);
			});
			// quiero pasar command a string
			console.log("COMANDO: ", aux)
			try {
				const comando = spawn(`ls`);
				console.log(comando.stdout);
				comando.stdout.pipe(process.stdout);
			} catch(error) {
				console.error("El comando no lo reconoce");
			}

		});

    // });

		connection.on('close', () => {
      console.log('A client has disconnected.');
    });

		connection.on('end', () => {
      console.log('A client has disconnected.');
    });


	}).listen(60301, () => {
		console.log('Waiting for clients to connect.');
	});

}