# Documentacion del proyecto CCDORADA

Este documento describe el estado actual comprobable del repositorio y el objetivo tecnico: construir CCDORADA con React Native y Expo para Android, iOS y web. Distingue la pantalla inicial existente de las funcionalidades de producto que aun no se han definido.

## Resumen ejecutivo

CCDORADA es una base de Expo/React Native con Expo SDK 57, Expo Router, Metro web y una pantalla inicial de bienvenida. La configuracion declara identificadores de Android e iOS. Aun no hay funcionalidades de producto, backend, persistencia ni otras pantallas.

**Objetivo:** mantener una base de codigo compartida con React Native y Expo para Android, iOS y web, y separar las diferencias de plataforma solo cuando sean necesarias.

**Versiones:** el manifiesto solicita Expo `^57.0.25`, React `19.2.3`, React Native `0.86.3` y TypeScript `^6.0.3`. La instalacion comprobada resolvio Expo `57.0.25`, React Native `0.86.3`, React Native Web `0.21.3`, NativeWind `4.2.7` y Tailwind CSS `3.4.19`. SDK 57 requiere Node `>=22.13`; el entorno comprobado usa Node `22.18.0`.

**Estado de validacion:** las compilaciones de web, Android e iOS y las comprobaciones de lint/tipos/Expo Doctor pasaron antes de los ultimos cambios al manifiesto, configuracion y pantalla. No se han vuelto a ejecutar sobre el estado descrito en esta revision.

## Inventario actual

| Archivo o carpeta | Estado y funcion observada |
| --- | --- |
| `App.tsx` | Componente de bienvenida. Presenta el nombre CCDORADA, una descripcion multiplataforma, un enlace de inicio y etiquetas de plataforma mediante componentes React Native y clases NativeWind. |
| `index.ts` | Punto de entrada personalizado. Importa `expo-router/entry`, por lo que la aplicacion inicia con Expo Router. |
| `package.json` y `package-lock.json` | Manifiesto npm y lockfile. Declaran Expo SDK 57, React/RN, Router, soporte web, NativeWind/Tailwind y scripts `start`, `android`, `ios`, `web`, `lint`, `typecheck` y `doctor`. NativeWind esta declarado en `devDependencies` con rango `^4.1.21`; el lockfile resuelve `4.2.7`. |
| `app.json` | Configuracion Expo: nombre `CCDORADA`, slug y scheme `ccdorada`, version `1.0.0`, modo vertical, tema claro, soporte tablet iOS, bundle ID y paquete Android `com.ccdorada.app`, recursos de icono/favicon, Metro para web, rutas tipadas y plugin Expo Router. |
| `src/app/_layout.tsx` y `src/app/index.tsx` | Layout raiz: importa CSS global, envuelve la app con `GestureHandlerRootView` y `SafeAreaProvider`, configura un Stack sin encabezado y muestra la barra de estado. La ruta inicial muestra la pantalla de bienvenida con enlace de Expo Router. |
| `babel.config.js`, `metro.config.js`, `tailwind.config.js`, `global.css` | Configuracion de Babel/Metro y Tailwind. Metro usa `withNativeWind` y el CSS global; Tailwind busca clases bajo `src/app`, `src/components` y `src`. Babel usa `babel-preset-expo` (ver pendientes de NativeWind). |
| `nativewind-env.d.ts` y `tsconfig.json` | Tipos NativeWind y TypeScript estricto. TypeScript hereda de Expo, ignora avisos deprecados de TS 6 e incluye el alias `@/*` hacia `src/*`. |
| `eslint.config.js` | Configuracion flat de ESLint basada en `eslint-config-expo`, con `dist/*` ignorado. |
| `assets/` | Recursos de imagen usados por la configuracion: icono general, iconos de Android (incluidos fondo y monocromo), favicon y recurso de splash. |
| `.gitignore` | Excluye dependencias, salidas web, datos locales de Expo, archivos de entorno local y carpetas nativas generadas. Esto concuerda con un flujo de Continuous Native Generation; no hay carpetas `ios/` ni `android/` en el estado actual. |
| `README.md` | Contiene solamente el titulo `CCDORADA`; aun no explica instalacion ni uso. |
| `AGENTS.md` | Instrucciones del repositorio para el trabajo futuro: priorizar Expo/React Native multiplataforma, consultar la documentacion correspondiente al SDK instalado, usar Expo Router y ejecutar lint y TypeScript antes de cerrar cambios. |
| `LICENSE` | Archivo de licencia presente; revisar su contenido antes de distribuir el proyecto. |

El gestor configurado es npm. No hay pruebas automatizadas ni servicios de datos/backend; tampoco se han definido las funcionalidades de producto. El enlace visible de la ruta inicial apunta a `/` (la misma ruta), asi que por ahora es un placeholder y no lleva a otra pantalla.

## Flujo actual de la aplicacion

1. Expo carga `index.ts`, definido como `main` en `package.json`.
2. `index.ts` importa `expo-router/entry` para registrar el router.
3. Expo Router descubre `src/app/_layout.tsx` y la ruta `src/app/index.tsx`.
4. El layout importa `global.css`, instala los proveedores de gestos/areas seguras y renderiza el Stack.
5. La ruta inicial muestra la pantalla CCDORADA usando clases NativeWind.

Este flujo solo proporciona la pantalla inicial. No hay aun autenticacion, persistencia, llamadas de red ni comportamiento especifico por plataforma.

## Objetivo multiplataforma

La intencion es compartir componentes y logica entre Android, iOS y web mediante React Native y Expo. La configuracion y dependencias ya permiten compilar las tres plataformas; que una compilacion termine correctamente no sustituye las pruebas visuales y funcionales en dispositivos y navegadores reales.

La version que resuelve actualmente el lockfile es NativeWind `4.2.7` con Tailwind CSS `3.4.19`. El manifiesto, sin embargo, declara NativeWind como `^4.1.21` y en `devDependencies`; mantener el lockfile o ajustar ese rango cambia lo que reproduce una instalacion desde cero. La guia oficial confirma soporte de SDK 57 en NativeWind 4.2.7. NativeWind v5 sigue en release candidate y no se usa en esta base.

Referencias oficiales consultadas para esta configuracion:

- [Referencia Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/): React Native 0.86, React 19.2.3, React Native Web 0.21 y Node minimo 22.13.x.
- [Instalacion de Expo Router para SDK 57](https://docs.expo.dev/versions/v57.0.0/router/installation.md): `expo-router/entry`, dependencias nativas y configuracion Metro para web.
- [Desarrollo web con Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/workflow/web.md): instalar `react-dom` y `react-native-web`, iniciar y exportar web.
- [Instalacion oficial de NativeWind](https://www.nativewind.dev/docs/getting-started/installation): NativeWind 4.2.7 estable para SDK 57, Tailwind CSS 3, preset Babel y configuracion Metro.

Principios propuestos para el desarrollo:

- Empezar por componentes y APIs de React Native/Expo que funcionen en las tres plataformas.
- Mantener el diseno adaptable a pantallas tactiles, tabletas y navegador; probar dimensiones y navegacion con teclado en web cuando corresponda.
- Aislar capacidades propias de una plataforma en componentes o modulos pequenos, en vez de dispersar condiciones por toda la interfaz.
- Antes de agregar una biblioteca que incluya codigo nativo, comprobar compatibilidad con la version de Expo instalada y considerar si requiere un development build en vez de Expo Go.
- Usar Expo Router para navegacion cuando se incorporen pantallas, siguiendo la convencion indicada en `AGENTS.md`: rutas en `src/app/` y componentes no asociados a rutas fuera de esa carpeta.
- No crear ni editar manualmente `ios/` o `android/` si se mantiene el flujo de carpetas nativas generadas; configurar esas capacidades mediante Expo y sus config plugins.

## Estructura actual y crecimiento sugerido

La carpeta `src/app/` ya existe y contiene el layout y la pantalla inicial. Estas otras carpetas son una propuesta para cuando haya funcionalidades que las necesiten, no contenido presente hoy:

```text
CCDORADA/
|-- src/
|   |-- app/             # Existe: rutas y layouts de Expo Router
|   |-- components/      # Propuesto: componentes compartidos
|   |-- features/        # Propuesto: funcionalidades por dominio
|   |-- hooks/           # Propuesto: hooks compartidos
|   |-- services/        # Propuesto: APIs y servicios
|   |-- types/           # Propuesto: tipos compartidos
|   `-- utils/           # Propuesto: utilidades
|-- assets/              # Imagenes, fuentes y otros recursos
|-- documentacion/       # Documentacion del proyecto
|-- app.json             # Configuracion de Expo
|-- package.json         # Existe: dependencias y scripts npm
`-- tsconfig.json        # Existe: configuracion TypeScript
```

La estructura debe crecer con las necesidades reales. No es necesario crear directorios vacios antes de que exista codigo que los necesite.

## Pendientes de configuracion y producto

1. Completar la configuracion de NativeWind v4 en `babel.config.js`: la guia oficial 4.x requiere `jsxImportSource: "nativewind"` en `babel-preset-expo` y el preset `nativewind/babel`; el archivo actual solo declara `babel-preset-expo`.
2. Verificar las dependencias peer indicadas por NativeWind para SDK 57: el manifiesto actual no declara `react-native-reanimated` ni `react-native-worklets`.
3. Instalar `expo-doctor` como dependencia de desarrollo o cambiar el script `doctor`: `npm run doctor` esta declarado, pero el paquete no se encontro instalado localmente.
4. Definir e implementar la primera funcionalidad real; la pantalla actual es una bienvenida y su enlace apunta a la misma ruta.
5. Probar interacciones y apariencia en dispositivos/emuladores Android e iOS y en navegadores objetivo.
6. Definir pruebas, manejo de errores, accesibilidad, persistencia y servicios externos segun los requisitos del producto.

## Comandos de desarrollo previstos

El gestor es npm; `npm ci` instala las versiones del lockfile. Comandos declarados:

```bash
npm start
npm run android
npm run ios
npm run web
npm run typecheck
npm run lint
npm run doctor
```

`npm run doctor` requiere que `expo-doctor` este instalado; actualmente no esta en las dependencias locales. Como alternativa puntual se puede invocar `npx --yes expo-doctor`. Para dependencias Expo usar `npx expo install <paquete>`; para NativeWind/Tailwind respetar sus versiones y pares oficiales. Consultar la documentacion versionada Expo 57 antes de usar APIs nuevas.

En la revision anterior, `npx expo export --platform web|android|ios`, `npm run typecheck`, `npx expo lint` y `npx --yes expo-doctor` (21/21) terminaron correctamente. Esos resultados son anteriores a las modificaciones actuales y deben repetirse antes de considerar esta configuracion validada. NPM reporto vulnerabilidades moderadas en el arbol de dependencias; no se aplicaron actualizaciones forzadas.

## Criterios para considerar validada cada plataforma

- **Android:** la app inicia y la pantalla principal se adapta a tamanos habituales; los recursos del icono se resuelven correctamente.
- **iOS:** la app inicia en iPhone y iPad; la interfaz respeta areas seguras y no depende de APIs exclusivas de Android.
- **Web:** la app compila y abre en navegador; los controles principales funcionan con interaccion web y el favicon configurado se carga.
- **Compartido:** las pantallas y la logica comun no dependen de modulos que falten en alguna plataforma. Cualquier excepcion queda aislada y documentada.

## Registro del alcance de este documento

La descripcion anterior se basa en los archivos presentes en el repositorio y las comprobaciones ejecutadas. No se han supuesto funcionalidades de negocio ni servicios que no esten implementados. Actualizar este inventario cada vez que cambien la arquitectura, las plataformas soportadas o los comandos de desarrollo.