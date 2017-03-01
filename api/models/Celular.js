module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    nombre:{
      type:'string',
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

