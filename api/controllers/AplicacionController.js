/**
 * AplicacionController
 *
 * @description :: Server-side logic for managing Aplicacions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  borrarAplicacion:function(req,res){
    Aplicacion.destroy({id:req.param('id')})
      .exec(function (err,app_borrada) {
        if(err) return res.view('error',{descripcion:err,link:"/listaaplicaciones"});
        return res.redirect('/listaaplicaciones');
      });
  },
  crearAplicacion:function(req,res){
    Aplicacion.findOne({nombre:req.param('nombre')}).exec(function (err,encontrado) {
      if(err){
        return res.view('error', {descripcion: err.message, link: "/nuevaaplicacion"});
      }else if(encontrado){
        return res.view('error', {descripcion: "Ya existe una aplicacion con ese nombre", link: "/nuevaaplicacion"});
      }else{
        Aplicacion.create(req.allParams())
          .exec(function (err,app_creada) {
            if(err) {
              return res.view('error', {descripcion: err.message, link: "/nuevaaplicacion"});
            }
            if(req.param('cel')){
              return res.redirect('/ruta/verAplicacionesCelular?id='+req.param('cel'));
            }
            return res.redirect('/listaaplicaciones');
          });
      }

    });

  },
  editarAplicacion:function(req,res){
    Aplicacion.update({
      id: req.param('id')
    },req.allParams())
      .exec(function (err,app_creada) {
        if(err) {
          return res.view('error', {descripcion: err.message, link: "/listaaplicaciones"});
        }
        return res.redirect('/listaaplicaciones');
      });
  },
};


