const vehiculos = [
    {
      id: 1,
      modelo: "BMW X5",
      marca: "BMW",
      imagenes: [
        "/src/assets/vehicles/bmw/320d.png",
        "/src/assets/vehicles/bmw/520i.png"
      ],
      descripcion: "SUV de lujo, gran desempeño y confort.",
      costoPorHora: 20,
      potencia: "250 CV",
      consumo: "10.5 L/100km",
      comodidades: "Aire acondicionado, Asientos de cuero, Cámara de reversa, Navegación GPS",
      pros: "Gran rendimiento, Tecnología avanzada, Confort superior",
      contras: "Consumo de combustible alto, Precio elevado",
      disponible: true
    },
    {
      id: 2,
      modelo: "Hyundai Tucson",
      marca: "Hyundai",
      imagenes: [
        "/src/assets/vehicles/hyundai/bayon.png",
        "/src/assets/vehicles/hyundai/i20.png"
      ],
      descripcion: "SUV compacta con gran eficiencia de combustible.",
      costoPorHora: 18,
      potencia: "180 CV",
      consumo: "7.2 L/100km",
      comodidades: "Pantalla táctil, Sensores de estacionamiento, Asistente de cambio de carril",
      pros: "Eficiencia de combustible, Buen manejo, Asequible",
      contras: "Espacio limitado, Interior básico",
      disponible: false
    },
    {
      id: 3,
      modelo: "Mercedes Benz Clase C",
      marca: "Mercedes",
      imagenes: [
        "/src/assets/vehicles/mercedes/mercedes-c200.png"
      ],
      descripcion: "Elegante sedán con tecnología avanzada.",
      costoPorHora: 25,
      potencia: "280 CV",
      consumo: "9.0 L/100km",
      comodidades: "Asientos de cuero, Sistema de sonido premium, Conducción autónoma parcial",
      pros: "Confort, Diseño elegante, Potencia",
      contras: "Alto costo de mantenimiento, Precio elevado",
      disponible: true
    },
    {
      id: 4,
      modelo: "Nissan Altima",
      marca: "Nissan",
      imagenes: [
        "/src/assets/vehicles/nissan/qashqai.png"
      ],
      descripcion: "Sedán cómodo y económico para viajes largos.",
      costoPorHora: 22,
      potencia: "240 CV",
      consumo: "8.5 L/100km",
      comodidades: "Control de clima, Cámara de reversa, Conectividad Bluetooth",
      pros: "Comodidad, Económico, Buen rendimiento",
      contras: "Diseño básico, Sin opciones de lujo",
      disponible: false
    },
    {
      id: 5,
      modelo: "Opel Astra",
      marca: "Opel",
      imagenes: [
        "/src/assets/vehicles/opel/astra.png"
      ],
      descripcion: "Compacto ideal para la ciudad, eficiente en combustible.",
      costoPorHora: 15,
      potencia: "150 CV",
      consumo: "6.5 L/100km",
      comodidades: "Pantalla táctil, Conectividad Apple CarPlay, Sensores de proximidad",
      pros: "Eficiencia, Precio accesible, Comodidad",
      contras: "Espacio limitado, Tecnología básica",
      disponible: true
    },
    {
      id: 6,
      modelo: "Toyota Corolla",
      marca: "Toyota",
      imagenes: [
        "/src/assets/vehicles/toyota/corolla.png"
      ],
      descripcion: "Sedán confiable y económico para todo tipo de viaje.",
      costoPorHora: 17,
      potencia: "170 CV",
      consumo: "7.0 L/100km",
      comodidades: "Aire acondicionado, Sistema de seguridad avanzado, Conectividad",
      pros: "Fiabilidad, Bajo costo de mantenimiento, Buen consumo",
      contras: "Diseño conservador, Potencia moderada",
      disponible: true
    }
  ];
  
  export default vehiculos;
  