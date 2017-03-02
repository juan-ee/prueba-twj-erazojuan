/**
 * RutaController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  nuevoCelular:function(req,res){
    return res.view('celular/nuevocelular');
  },
  nuevaAplicacion:function(req,res){
    if(req.param('cel')){
      return res.view('aplicacion/nuevaaplicacion',req.allParams());
    }
    return res.view('aplicacion/nuevaaplicacion',{cel:undefined});

  },
  listarCelulares:function(req,res){

    Celular.find().exec(function (err,celulares) {
      if(err){
        return res.view('error',{descripcion:err,link:"/"});
      }
      return res.view('celular/listacelulares',{celulares:celulares});
    });
  },
  listarAplicaciones:function(req,res){
    //todo listar aplicaciones dependiendo del lugar
    Aplicacion.find().exec(function (err,aplicaciones) {
      if(err){
        return res.view('error',{descripcion:err,link:"/"});
      }
      return res.view('aplicacion/listaaplicaciones',{aplicaciones:aplicaciones});
    });
  },
  editarAplicacion:function(req,res){
    return res.view('aplicacion/edicion',{aplicacion:req.allParams()});
  },
  editarCelular:function(req,res){
    return res.view('celular/edicion',{celular:req.allParams()});
  },
  verAplicacionesCelular:function(req,res){
    Celular.findOne({id:req.param('id')}).populate('apps').exec(function (err,celular) {
      if(err){
        return res.view('error',{descripcion:err,link:"/"});
      }
      Aplicacion.find().exec(function (err,aplicaciones) {
        if(err){
          return res.view('error',{descripcion:err,link:"/"});
        }
        return res.view('celular/aplicacionescelular',{
          nombre:celular.nombre,
          id:celular.id,
          apps:celular.apps,
          otras:aplicaciones.reduce((reducido,key)=> { if(!celular.apps.some(elem => _.isEqual(elem,key)) && key.cel==undefined){reducido.push(key)}return reducido},[])
        });
      });

    });

  }

};

