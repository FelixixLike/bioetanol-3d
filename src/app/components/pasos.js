"use client";

export const pasos = {
    1: {
        model: "/modelos/pineapple.glb",
        title: "Materia prima",
        description: "Se selecciona la piña como fuente de biomasa rica en azúcares.",
        scale: 0.6 ,
        objetive: "Identificar y seleccionar piñas adecuadas como materia prima para la producción de bioetanol."
      },
      2: {
        model: "/modelos/triturador.glb",
        title: "Preparación - Trituración",
        description: "La piña se tritura para liberar los azúcares presentes, aumentando la superficie de contacto para facilitar la hidrólisis de la celulosa.",
        scale: 5 ,
        objetive: "Reducir el tamaño de las partículas para mejorar la liberación de azúcares."
      },
      3: {
        model: "/modelos/extractor.glb",
        title: "Extracción de jugo",
        description: "Se extraen los azúcares mediante prensado mecánico, agua caliente o solventes enzimáticos.",
        scale: 5 ,
        objetive: "Separar los azúcares presentes en la pulpa y la cáscara de la piña utilizando métodos físicos o químicos, con el fin de obtener un líquido rico en compuestos fermentables para el siguiente proceso."
      },
      4: {
        model: "/modelos/hidrolización.glb",
        title: "Pretratamiento - Hidrolización",
        description: "Se añaden enzimas o ácidos para romper los carbohidratos complejos en azúcares simples mediante hidrólisis química o enzimática.",
        scale: 5 ,
        objetive: "Convertir carbohidratos complejos en azúcares fermentables mediante tratamiento químico o enzimático."
      },
      5: {
        model: "/modelos/fermentacion.glb",
        title: "Fermentación",
        description: "Las levaduras convierten los azúcares en etanol y dióxido de carbono bajo condiciones controladas de temperatura, pH y tiempo.",
        scale: 5 ,
        objetive: "Transformar los azúcares simples en etanol mediante acción de levaduras."
      },
      6: {
        model: "/modelos/destilacion.glb",
        title: "Destilación",
        description: "Se separa el etanol del agua y otros compuestos calentando el mosto fermentado y condensando los vapores de etanol.",
        scale: 5 ,
        objetive: "Separar y concentrar el etanol producido durante la fermentación."
      },
      7: {
        model: "/modelos/purificacion.glb",
        title: "Purificación",
        description: "Se obtiene etanol con mayor pureza mediante destilación fraccionada o adsorción con tamices moleculares.",
        scale: 5 ,
        objetive: "Eliminar impurezas y obtener etanol de alta pureza."
      },
      8: {
        model: "/modelos/bioetanol.glb",
        title: "Bioetanol Final",
        description: "El bioetanol purificado se almacena en contenedores para su posterior aplicación como biocombustible.",
        scale: 5 ,
        objetive: "Almacenar el bioetanol obtenido en condiciones adecuadas para su uso."
      },
      9: {
        model: "/modelos/celdas.glb",
        title: "Aplicación en Celdas de Combustible",
        description: "El bioetanol se usa en pilas de combustible para generar electricidad.",
        scale: 5 ,
        objetive: "Transformar la energía química del bioetanol en energía eléctrica mediante celdas de combustible, promoviendo una fuente de energía limpia y eficiente con aplicaciones en sistemas portátiles o estacionarios."
      }
    };