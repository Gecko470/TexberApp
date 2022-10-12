import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor, Fibra, Almacen, AcumuladoStock, Cliente, CabAlbProv, Articulo, LinAlbProv, CabAlbCli, LinAlbCli, LineaAlbaran, Domicilio, Linea, ProduccionesxLinea, DatosConsumos, LineaConsumos, ProduccionesxLineaMp, DatosTraspaso, DatosEntrada, MovimientosStock, ProduccionesxLineaPf } from '../interfaces/interfaces';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TexberService {

  lineasAlbaran: LineaAlbaran[] = [];
  articulos: Articulo[] = [];
  datosConsumos: DatosConsumos = {
    codLinea: '',
    numeroFabricacion: '',
    datosEstablecidos: 0
  }
  lineasConsumos: LineaConsumos[] = [];
  lineasMovimientosStock: MovimientosStock[] = [];
  datosTraspaso: DatosTraspaso = {
    almacenOrigen: '',
    almacenDestino: '',
    datosEstablecidos: 0
  }
  datosEntrada: DatosEntrada = {
    codCliente: '',
    codFibra: '',
    datosEstablecidos: 0,
    numBulto: 1,
    orden: 5,
    numAlbaran: 0
  }
  lineasAlbProv: LinAlbProv[] = [];

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${environment.baseUrl}/proveedores`);
  }

  getProveedorCod(codProveedor: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${environment.baseUrl}/proveedores/${codProveedor}`);
  }

  getFibras(): Observable<Fibra[]> {
    return this.http.get<Fibra[]>(`${environment.baseUrl}/fibras`);
  }

  getFibraCod(codFibra: string): Observable<Fibra> {
    return this.http.get<Fibra>(`${environment.baseUrl}/fibras/${codFibra}`);
  }

  getAlmacenes(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(`${environment.baseUrl}/almacenes`);
  }

  getAlmacenesByCodArtPart(codArticulo: string, partida: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/almacenes/${codArticulo}/${partida}`);
  }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${environment.baseUrl}/articulos`)
  }

  getArticuloByCod(codArticulo: string): Observable<Articulo> {
    return this.http.get<Articulo>(`${environment.baseUrl}/articuloByCod/${codArticulo}`)
  }

  getPartidasByCodArticulo(codArticulo: string, codAlmacen: string): Observable<AcumuladoStock[]> {
    return this.http.get<AcumuladoStock[]>(`${environment.baseUrl}/partidasByCodArticuloAlmacen/${codArticulo}/${codAlmacen}`);
  }

  postCabAlbProv(cabeceraAlbaran: CabAlbProv): Observable<number> {

    return this.http.post<number>(`${environment.baseUrl}/cabAlbProv`, cabeceraAlbaran);
  }

  postLineasAlbProv(lineasAlbProv: LinAlbProv[]): Observable<string[]> {
    return this.http.post<string[]>(`${environment.baseUrl}/lineasAlbProv`, lineasAlbProv);
  }

  getNumAlbaran(): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/numAlbaran`);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.baseUrl}/clientes`);
  }

  getClienteByCod(codCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.baseUrl}/clientes/${codCliente}`);
  }

  getClienteByCodArtiuclo(codArticulo: string, codPartida: string): Observable<string> {
    return this.http.get(`${environment.baseUrl}/cliente/${codArticulo}/${codPartida}`, { responseType: 'text'});
  }

  getDomiciliosByCodCliente(codCliente: string): Observable<Domicilio[]> {
    return this.http.get<Domicilio[]>(`${environment.baseUrl}/domicilios/${codCliente}`);
  }

  getStockByCod(codBarras: string): Observable<AcumuladoStock[]> {
    return this.http.get<AcumuladoStock[]>(`${environment.baseUrl}/stockByCod/${codBarras}`);
  }

  getStockByCodPart(codArticulo: string, partida: string, codAlmacen: string): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/stockByCodPart/${codArticulo}/${partida}/${codAlmacen}`);
  }

  getLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(`${environment.baseUrl}/lineas`)
  }

  getOrdenesFabByLin(linea: string): Observable<ProduccionesxLinea[]> {
    return this.http.get<ProduccionesxLinea[]>(`${environment.baseUrl}/ordenesFabByLin/${linea}`)
  }

  getLinAlbCli(codArticulo: string): Observable<LinAlbCli[]> {
    return this.http.get<LinAlbCli[]>(`${environment.baseUrl}/histEntregas/${codArticulo}`)
  }

  postCabAlbCli(cabAlbCli: CabAlbCli): Observable<number> {
    return this.http.post<number>(`${environment.baseUrl}/cabAlbCli`, cabAlbCli)
  }

  postLinAlbCli(linAlbCli: LinAlbCli[]): Observable<string[]> {
    return this.http.post<string[]>(`${environment.baseUrl}/linAlbCli`, linAlbCli)
  }

  postConsumos(consumos: ProduccionesxLineaMp[]): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/consumos`, consumos)
  }

  setLineasAlbaran(lineaAlbaran: LineaAlbaran) {
    this.lineasAlbaran.push(lineaAlbaran);
  }

  getLineasAlbaran() {
    return this.lineasAlbaran;
  }

  setLineasAlbProv(lineaAlbProv: LinAlbProv) {
    this.lineasAlbProv.push(lineaAlbProv);
  }

  getLineasAlbProv() {
    return this.lineasAlbProv;
  }

  borarLineasAlbProv() {
    this.lineasAlbProv = [];
  }

  emitirArticulos(articulos: Articulo[]) {
    this.articulos = articulos;
  }

  obtenerArticulos() {
    return this.articulos;
  }

  setDatosConsumos(datos: DatosConsumos) {
    this.datosConsumos = datos;
  }

  getDatosConsumos() {
    return this.datosConsumos;
  }

  borrarDatosConsumos() {
    this.datosConsumos = {
      codLinea: '',
      numeroFabricacion: '',
      datosEstablecidos: 0
    }
  }

  setLineasConsumos(lineaConsumos: LineaConsumos) {
    this.lineasConsumos.push(lineaConsumos);
  }

  getLineasConsumos() {
    return this.lineasConsumos;
  }

  borrarLineasConsumos() {
    this.lineasConsumos = [];
  }

  setLineasMovimientosStock(lineaMovimientosStock: MovimientosStock) {
    this.lineasMovimientosStock.push(lineaMovimientosStock);
  }

  getLineasMovimientosStock() {
    return this.lineasMovimientosStock;
  }

  borrarLineasMovimientosStock() {
    this.lineasMovimientosStock = [];
  }

  setDatosTraspaso(datosTraspaso: DatosTraspaso) {
    this.datosTraspaso = datosTraspaso;
  }

  getDatosTraspaso() {
    return this.datosTraspaso;

  }
  setDatosEntrada(datosEntrada: DatosEntrada) {
    this.datosEntrada = datosEntrada;
  }

  borrarDatosTraspaso() {
    this.datosTraspaso = {
      almacenOrigen: '',
      almacenDestino: '',
      datosEstablecidos: 0
    }
  }

  getDatosEntrada() {
    return this.datosEntrada;
  }

  borrarDatosEntrada() {
    this.datosEntrada = {
      codCliente: '',
      codFibra: '',
      datosEstablecidos: 0,
      numBulto: 0,
      orden: 0,
      numAlbaran: 0
    }
  }

  getMovimientosStock(lineaMovimientosStock: MovimientosStock): Observable<number> {
    return this.http.post<number>(`${environment.baseUrl}/getMovimientosStock`, lineaMovimientosStock);
  }

  setMovimientosStock(lineasMovimientosStock: MovimientosStock[]): Observable<string[]> {
    return this.http.post<string[]>(`${environment.baseUrl}/setMovimientosStock`, lineasMovimientosStock);
  }

  getOrdenesFab(codLinea: string): Observable<number[]>{
    return this.http.get<number[]>(`${environment.baseUrl}/getOrdenesFab/${codLinea}`);
  }

  getLineasOrdenFabMp(codLinea: string, ordenFab: number): Observable<ProduccionesxLineaMp[]>{
    return this.http.get<ProduccionesxLineaMp[]>(`${environment.baseUrl}/getLineasOrdFabMp/${codLinea}/${ordenFab}`);
  }

  getLineasOrdenFabPf(codLinea: string, ordenFab: number): Observable<ProduccionesxLineaPf[]>{
    return this.http.get<ProduccionesxLineaPf[]>(`${environment.baseUrl}/getLineasOrdFabPf/${codLinea}/${ordenFab}`);
  }

  setProduccionMp(lineaProduccionMp: ProduccionesxLineaMp): Observable<string>{
    return this.http.post(`${environment.baseUrl}/setProduccionMp`, lineaProduccionMp, { responseType: 'text'});
  }

  setProduccionPf(lineaProduccionPf: ProduccionesxLineaPf): Observable<string>{
    return this.http.post(`${environment.baseUrl}/setProduccionPf`, lineaProduccionPf, { responseType: 'text'});
  }

  cerrarOrdFab(codLinea: string, ordFab:number): Observable<number>{
    return this.http.get<number>(`${environment.baseUrl}/cerrarOrdenFab/${codLinea}/${ordFab}`);
  }
}
