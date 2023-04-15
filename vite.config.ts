import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "taskhub",
        short_name: "taskhub",
        description: "This App was designed With The purpose of managing Project Based Tasks.It takes the project as a whole and Breaks The Overall Project into task to be completetd which changes the how the project is Approched!",
        
        icons: [
          { src: "./tasks.png", sizes: "64x64", types: "image/png", purpose: "any maskable" },
          { src: "./tasks2.png", sizes: "256x256", types: "image/png", purpose: "any maskable" },
        ]
      },
      workbox: {
        runtimeCaching: [
          { 
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api")
            },
            handler: "NetworkFirst" as const,
            options: {
              cacheName: "api-Cache",
              cacheableResponse: {
                statuses: [0, 200, 201]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 4500,
  }
})
