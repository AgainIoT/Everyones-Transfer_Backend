// config.js

export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '서울 지하철 환승지도 openAPI',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // files containing annotations as above
  };