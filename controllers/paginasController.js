import { Testimonial } from "../model/Testimoniales.js"
import { Viaje } from "../model/Viajes.js"




const paginaInicio = async(req, res) => {

    const promiseDB = []
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try {
        const resultado = await Promise.all(promiseDB)

        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimonios: resultado[1]
        })

    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => { /* Req lo que enviamos, res lo que recibimos */

    const pagina = "Nosotros"

    res.render("nosotros", {
        pagina
    })
}

const paginaViaje = async (req, res) => { /* Req lo que enviamos, res lo que recibimos */
    // consultar db
    const viajes = await Viaje.findAll();


    res.render("viajes", {
        pagina: "Proximos viajes",
        viajes
    })
}

const paginaTestimoniales = async (req, res) => { /* Req lo que enviamos, res lo que recibimos */


    try {
        const testimonios = await Testimonial.findAll();

        res.render("testimoniales", {
            pagina: "Testimoniales",
            testimonios
        })

    } catch (error) {
        console.log(error)
    }

}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    try {
        const resultado = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: "Informacion viaje",
            resultado
        })

    } catch (error) {
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViaje,
    paginaTestimoniales,
    paginaDetalleViaje
}