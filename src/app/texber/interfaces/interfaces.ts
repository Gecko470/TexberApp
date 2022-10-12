

export interface Proveedor {
    codigoProveedor: string;
    siglaNacion: string;
    cifDni: string;
    cifEuropeo: string;
    razonSocial: string;
    nombre: string;
    domicilio: string;
    codigoContable: string;
    codigoPostal: string;
    codigoMunicipio: string;
    municipio: string;
    codigoProvincia: string;
    provincia: string;
    codigoNacion: number;
    nacion: string;
}

export interface Fibra {
    coFibra1: string;
    coDescFibra: string;
}

export interface Almacen {
    codigoAlmacen: string;
    almacen: string;
    idAlmacen: string;
}

export interface Articulo {
    codigoArticulo: string,
    descripcionArticulo: string,
    codigoAlternativo: string,
    tipoArticulo: string,
    codigoFamilia: string,
    precioVenta: number
}

export interface AcumuladoStock {
    codigoArticulo: string,
    codigoAlmacen: string,
    partida: string,
    unidadEntrada: number,
    unidadSalida: number,
    unidadSaldo: number,
}


export interface CabAlbProv {
    NumeroAlbaran: number,
    CodigoProveedor: string;
    SiglaNacion: string;
    CifDni: string;
    CifEuropeo: string;
    RazonSocial: string;
    Nombre: string;
    Domicilio: string;
    CodigoContable: string;
    CodigoPostal: string;
    CodigoMunicipio: string;
    Municipio: string;
    CodigoProvincia: string;
    Provincia: string;
    CodigoNacion: number;
    Nacion: string;
    CoFibra: string
}

export interface LinAlbProv {
    NumeroAlbaran: number,
    Orden: number,
    CodigoArticulo: string,
    CodigoAlmacen: string,
    Partida: string,
    DescripcionArticulo: string,
    CodigodelProveedor: string,
    Unidades: number,
    Unidades2: number
}

export interface Domicilio {
    tipoDomicilio: string;
    razonSocial: string;
    domicilio1: string;
    municipio: string;
    nacion: string;
    idDomicilio: string;
}


export interface LineaAlbaran {
    codBarras: string,
    codProducto: string,
    codigoAlmacen: string,
    nombreAlmacen: string,
    partida: string,
    bultos: number,
    CoBobinas: number,
    peso: number,
    comentarios: string,
}

export interface Cliente {
    codigoCliente: string,
    siglaNacion: string,
    cifDni: string,
    cifEuropeo: string,
    codigoProveedor: string,
    codigoContable: string,
    codigoCategoriaCliente: string,
    razonSocial: string,
    nombre: string,
    domicilio: string,
    codigoSigla: string,
    viaPublica: string,
    numero1: string,
    codigoPostal: string,
    codigoMunicipio: string,
    municipio: string,
    codigoProvincia: string,
    provincia: string,
    codigoNacion: string,
    nacion: string,
    telefono: string,
    cuentaProvision: string,
    idCliente: string
}

export interface CabAlbCli {
    serieAlbaran: string,
    numeroAlbaran: number,
    codigoCliente: string,
    siglaNacion: string,
    cifDni: string,
    razonSocial: string,
    razonSocialEnvios: string,
    nombre: string,
    nombreEnvios: string,
    domicilio: string,
    domicilioEnvios: string,
    viaPublicaEnvios: string,
    codigoPostal: string,
    codigoPostalEnvios: string,
    codigoMunicipio: string,
    codigoMunicipioEnvios: string,
    municipio: string,
    municipioEnvios: string,
    provincia: string,
    provinciaEnvios: string,
    codigoNacion: string,
    codigoNacionEnvios: string,
    nacion: string,
    nacionEnvios: string,
    telefonoEnvios: string,
    codigoContable: string,
}

export interface LinAlbCli {
    serieAlbaran: string,
    numeroAlbaran: number,
    orden: number,
    codigoArticulo: string,
    tipoArticulo: string,
    codigoAlmacen: string,
    partida: string,
    descripcionArticulo: string,
    codigoFamilia: string,
    codigoIva: number,
    unidades: number,
    unidades2: number,
    precio: number,
    precioRebaje: number,
    iva: number,
    CoBobinas: number
}

export interface Login {
    usuario: string,
    password: string,
    token: string
}

export interface Etiqueta {
    numAlb: string,
    numBulto: string
}

export interface Linea {
    coCodigoLinea: string,
    descripcion: string
}

export interface ProduccionesxLinea {
    coCodigoLinea: string,
    numeroFabricacion: number,
    statusActivo: number,
}

export interface ProduccionesxLineaMp {
    numeroFabricacion: number,
    coCodigoLinea: string,
    codigoArticulo: string,
    partida: string,
    unidades: number,
    codigoAlmacen: string
}

export interface ProduccionesxLineaPf {
    coCodigoLinea: string,
    numeroFabricacion: number,
    codigoArticulo: string,
    partida: string,
    codigoProveedor: string,
    coFibra: string,
    seriePedido: string,
    numeroPedido: number,
    codigoAlmacen: string,
    unidades: number
}

export interface DatosConsumos {
    codLinea: string,
    numeroFabricacion: string,
    datosEstablecidos: number
}

export interface LineaConsumos {
    codProducto: string,
    partida: string,
    bobinas: number,
    peso: number,
    almacen: string
}

export interface DatosTraspaso {
    almacenOrigen: string,
    almacenDestino: string,
    datosEstablecidos: number
}

export interface DatosEntrada {
    codCliente: string,
    codFibra: string,
    datosEstablecidos: number,
    numBulto: number,
    orden: number,
    numAlbaran: number
}

export interface LineaTraspasoAlm {
    codArticulo: string,
    partida: string,
    almOrigen: string,
    unidades: number
}

export interface MovimientosStock {
    codigoArticulo: string,
    codigoAlmacen: string,
    codigoAlmacen2: string,
    partida: string,
    tipoMovimiento: number,
    unidades: number,
    unidades2: number,
    comentario: string,
    usuarioProceso: number,
    unidadEntrada: number,
    unidadStock: number
}