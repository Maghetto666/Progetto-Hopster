package it.hopster.dbapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.InvoiceNotFoundException;
import it.hopster.dbapi.model.Invoice;
import it.hopster.dbapi.model.Supplier;
import it.hopster.dbapi.service.InvoiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/invoices")
@Tag(name = "Gestione bevande", description = "API di gestione bevande database Hopster")
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;

    private static final Logger logger = LoggerFactory.getLogger(InvoiceController.class);

    @GetMapping
    @Operation(summary = "Recupera bevande", description = "Recupera tutte le bevande sul database")
    @ApiResponse(responseCode = "200", description = "Bevande recuperate con successo")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera fattura per id", description = "Torna la fattura con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fattura trovata"),
            @ApiResponse(responseCode = "404", description = "Fattura non trovata con quell'id")
    })
    public Invoice getInvoiceById(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoiceById(id);
        if (invoice == null) {
            logger.error("Fattura non trovata con quell'id");
            throw new InvoiceNotFoundException("Invoice not found with id: " + id);
        }
        return invoice;
    }

    @PostMapping
    @Operation(summary = "Aggiunge una fattura", description = "Aggiunge una nuova fattura sul database")
    @ApiResponse(responseCode = "200", description = "Fattura aggiunta con successo")
    public ResponseEntity<Invoice> createInvoice(
            @RequestParam Long invoiceNumber, @RequestParam Date deliveryDate,
            @RequestParam String suppliesType, @RequestParam Supplier supplier
    ) {
        Invoice newInvoice = invoiceService.createInvoice(invoiceNumber, deliveryDate, suppliesType, supplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(newInvoice);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli fattura", description = "Modifica i dettagli di una fattura trovata tramite id")
    @ApiResponse(responseCode = "200", description = "Fattura modificata con successo")
    public Invoice updateInvoice(@PathVariable Long id,
                                 @RequestParam Long invoiceNumber, @RequestParam Date deliveryDate,
                                 @RequestParam String suppliesType, @RequestParam Supplier supplier
    ) {
        Invoice updatedInvoice = invoiceService.updateInvoice(invoiceNumber, deliveryDate, suppliesType, supplier);
        if (updatedInvoice == null) {
            logger.error("Fattura non trovata con quell'id");
            throw new InvoiceNotFoundException("Invoice not found with id: " + id);
        } else {
            return updatedInvoice;
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella fattura", description = "Cancella fattura dal database")
    @ApiResponse(responseCode = "200", description = "Fattura cancellata dal database")
    public void deleteInvoice(@PathVariable Long id) {
        boolean deleted = invoiceService.deleteInvoice(id);
        if (!deleted) {
            logger.error("Fattura non trovata con quell'id");
            throw new InvoiceNotFoundException("Invoice not found with id: " + id);
        }
    }
}