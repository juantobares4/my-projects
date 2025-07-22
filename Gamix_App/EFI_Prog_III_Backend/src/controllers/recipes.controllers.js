// import Recipe from "../model/recipes.model.js";

// export const getRecipes = async (req, res) => {
//     try {
//         const productos = await Recipe.findAll();
//         res.json(productos);
//       } catch (error) {
//         console.error('Error al obtener productos:', error);
//         res.status(500).json({ message: 'Error al obtener productos' });
//       }
// }

// export const postRecipes = async (req, res) => {
//     console.log(`Body ${req.body}`)
//     const { nombre, ingredientes, tiempo } = req.body;
//     console.log(nombre, ingredientes, tiempo);
    
//     if (!nombre || !ingredientes || !tiempo) {
//         return res.status(400).json({error: "Nombre o ingredientes son obigatorios"});
//     }
    
//     try{
//         const newRecipe = await Recipe.create(
//             {
//               nombre: nombre,
//               ingredientes: ingredientes,
//               tiempo: tiempo
//             },
//           )
//           res.status(201).json({message: 'Receta creada exitosamente'})
//           ;
//     } catch (error){
//         console.log("🚀 ~ postRecipes ~ error:", error)
//         return res.status(500).json({error: 'Error al insertar base de datos'})
//     }
// }
