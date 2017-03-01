module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    nombre:{
      type:'string',
      unique:true
    },
    sistemaoperativo:{
      type:'string'
    },
    version:{
      type:'integer'
    },
    apps: {
      collection: 'aplicacion',
      via: 'cel'
    }
  }
};

