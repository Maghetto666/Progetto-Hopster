package it.hopster.dbapi.mapper;

import it.hopster.dbapi.model.Invoice;
import it.hopster.dbapi.model.InvoiceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InvoiceMapper {
    InvoiceMapper INSTANCE = Mappers.getMapper((InvoiceMapper.class));

    @Mapping(source = "supplier.id", target = "supplier_id")
    InvoiceDTO entityToDTO(Invoice invoice);

    @Mapping(source = "supplier_id", target = "supplier.id")
    Invoice DTOToEntity(InvoiceDTO invoiceDTO);
}
