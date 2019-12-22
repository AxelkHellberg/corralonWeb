

[![Build Status](https://travis-ci.org/akveo/ngx-admin.svg?branch=master)](https://travis-ci.org/akveo/ngx-admin)

[![Join the chat at https://gitter.im/ng2-admin/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ng2-admin/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Dependency Status](https://david-dm.org/akveo/ngx-admin/status.svg)](https://david-dm.org/akveo/ng2-admin)

  

[Who uses ngx-admin?](https://github.com/akveo/ngx-admin/issues/1645)| [Documentation](https://akveo.github.io/ngx-admin/?utm_source=github&utm_medium=ngx_admin_readme&utm_campaign=themes) | [Installation Guidelines](https://akveo.github.io/ngx-admin/docs/getting-started/what-is-ngxadmin?utm_source=github&utm_medium=ngx_admin_readme&utm_campaign=themes)


## Solución de Errores Comunes
### Node-Sass

Generalmente se produce un error al instalar las dependencias del proyecto, relacionado con este paquete, la solución a esto es realizar lo siguiente:

Ejecutar en cualquier consola como **Administrador** los siguientes comandos:

    npm install --global --production windows-build-tools
    npm install node-gyp -g

Seguidamente en caso de tener la carpeta node_modules, eliminarla y proceder a reinstalar los paquetes; en el transcurso de la instalación posiblemente aparezcan nuevos errores, los cuales lo solucionamos ejecutando lo siguiente 

Debemos instalar la versión de **node-sass** según la versión de Node que tengamos, para saber que versión instalar sugiero guiarse de acá:

[https://www.npmjs.com/package/node-sass](https://www.npmjs.com/package/node-sass)

Una vez encontrada la versión ideal, instalar como una dependencia de desarrollo

    npm i node-sass@{LAVERSION} --save-dev


## Configuración de los entornos (dominios)

La aplicación cuenta con dos archivos de configuración ubicados en la carpeta **config** dentro de **assets**:

 - config.json: Corresponde al entorno de desarrollo
 - config.prod.json: Corresponde al entorno de producción

Ambos archivos poseen una única propiedad llamada **"url"** donde va nuestro dominio.

### ¿Como saber que archivo modificar?

Hay que tener en cuenta que estas configuraciones aplican para cuando estamos desarrollando y cuando nuestra app está buildeada.

 **Cuando estamos desarrollando**
 Los archivos de configuración están en *src/assets/config* 
|Comando  |Archivo  |
|--|--|
|ng serve  | config.json |
|ng serve --prod | config.prod.json |

 **Cuando nuestra app está buildeada**
 Los archivos de configuración están en *dist/assets/config*
|Comando  |Archivo  |
|--|--|
|ng build| config.json |
|ng build --prod | config.prod.json |
