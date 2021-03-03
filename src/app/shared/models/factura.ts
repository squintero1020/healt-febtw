export class Factura {
  facturaId: number;
  nFactura: string;
  fechaFactura: string;
  proveedorId: number;
  fiscalIdProveedor: string;
  nombreProveedor: string;
  correoProveedor: string;
  clienteId: number;
  fiscalIdCliente: string;
  tipoDocumento: string;
  moneda: string;
  fechaVencimiento: string;
  fechaValDian: string;
  fechaFirma: string;
  nOrdenCompra: string;
  subtotal: number;
  impuestos: number;
  total: number;
  formaPago: string;
  plazoPagoDias: number;
  medioPago: string;
  cufecude: string;
  quienFirma: string;
  fechaIngreso: string;
  fechaSalida: string;
  valDian: string;
  firmaDig: string;
  comentarios: string;
  estadoId: number;
  encabezadoFlujoId: number;
  dueDays: number;
  dayInGdoc: number;
  facturasFlujo: [
    {
      facturaFlujoId: number;
      clienteId: number;
      facturaId: number;
      proveedorId: number;
      flujoId: number;
      detalleFlujoId: number;
      estadoId: number;
      accionId: number;
      disparadores: string;
      comentarios: string;
      usuarioId: number;
    }
  ];
  inactive: true;
  createdAt: string;
  modifyDate: string;
  modifiedBy: string;
  createdBy: string;
  canModify: boolean;
}
