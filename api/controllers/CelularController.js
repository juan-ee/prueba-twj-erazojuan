/**
 * CelularController
 *
 * @description :: Server-side logic for managing Celulars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearCelular:function(req,res,next){ //crearUNO celular
    Celular.findOne({nombre:req.param('nombre')}).exec(function (err,encontrado) {
      if(err){
        return res.view('error', {descripcion: err.message, link: "/nuevocelular"});
      }else if(encontrado){
        return res.view('error', {descripcion: "Ya existe ese modelo de celular", link: "/nuevocelular"});
      }else{
        Celular.create(req.allParams())
          .exec(function (err,app_creada) {
            if(err) {
              return res.view('error', {descripcion: err.message, link: "/nuevocelular"});
            }
            return res.redirect('/listacelulares');
          });
      }

    });

  },
  editarCelular:function(req,res){ //actualizar UNO
    Celular.update({
      id: req.param('id')
    },req.allParams())
      .exec(function (err,celular_actualizado) {
        if(err) {
          return res.view('error', {descripcion: err.message, link: "/listacelulares"});
        }
        return res.redirect('/listacelulares');
      });
  },
  borrarCelular:function(req,res){//BORRAR UNO CELULAR
    Celular.destroy({id:req.param('id')})
      .exec(function (err,app_borrada) {
        if(err) return res.view('error',{descripcion:err,link:"/listacelulares"});
        return res.redirect('/listacelulares');
      });
  },
  agregarAplicacion:function (req,res) {
    Celular.findOne({id:req.param('id_cel')}).populate('apps').exec(function (err,celular) {
      if(err){
        return res.view('error',{descripcion:err,link:"/listacelulares"});
      }
      celular.apps.add(req.param('id_app'));
      celular.save(function(err){
        if (err) { return res.view('error',{descripcion:err,link:"/listacelulares"}); }
        return res.redirect('/ruta/verAplicacionesCelular?id='+req.param('id_cel'));
      });
    });
  },
  quitarAplicacion:function (req,res) {
    Celular.findOne({id:req.param('id_cel')}).populate('apps').exec(function (err,celular) {
      if(err){
        return res.view('error',{descripcion:err,link:"/listacelulares"});
      }
      celular.apps.remove(req.param('id_app'));
      celular.save(function(err){
        if (err) { return res.view('error',{descripcion:err,link:"/listacelulares"}); }
        return res.redirect('/ruta/verAplicacionesCelular?id='+req.param('id_cel'));
      });
    });
  },
};

