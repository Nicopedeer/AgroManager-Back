FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expon el puerto que tu aplicación utiliza
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
