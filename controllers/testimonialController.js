import { Testimonial } from "../model/Testimoniales.js";



const guardarTestimonial = async(req, res) => { /* Req lo que enviamos, res lo que recibimos */

    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() == '') {
        errores.push({mensaje: "El nombre esta vacio"});
    }

    if (correo.trim() == '') {
        errores.push({mensaje: "El correo esta vacio"});
        console.log('El Correo esta vacio');
    }

    if (mensaje.trim() == '') {
        errores.push({mensaje: "Mensaje vacio"});
    }

    if (errores.length > 0) {
        // Consultar los testimoniales existentes
        const testimonios = await Testimonial.findAll();


        res.render('testimoniales', {
            pagina: "Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })

    }else{
        // Almacenar en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }
}

export{
    guardarTestimonial
}