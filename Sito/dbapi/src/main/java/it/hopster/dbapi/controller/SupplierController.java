package it.hopster.dbapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.SupplierNotFoundException;
import it.hopster.dbapi.model.Invoice;
import it.hopster.dbapi.model.Supplier;
import it.hopster.dbapi.service.SupplierService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@Tag(name = "Gestione fornitori", description = "API di gestione fornitori database Hopster")
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    private static final Logger logger = LoggerFactory.getLogger(SupplierController.class);

    @GetMapping
    @Operation(summary = "Recupera fornitori", description = "Recupera tutti i fornitori sul database")
    @ApiResponse(responseCode = "200", description = "Fornitori recuperati con successo")
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera fornitore per id", description = "Torna il fornitore con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fornitore trovato"),
            @ApiResponse(responseCode = "404", description = "Fornitore non trovato con quell'id")
    })
    public Supplier getSupplierById(@PathVariable Long id) {
        Supplier supplier = supplierService.getSupplierById(id);
        if (supplier == null) {
            logger.error("Fornitore non trovato con quell'id");
            throw new SupplierNotFoundException("Supplier not found with id: " + id);
        }
        return supplier;
    }

    @PostMapping
    @Operation(summary = "Aggiunge un fornitore", description = "Aggiunge un nuovo fornitore sul database")
    @ApiResponse(responseCode = "200", description = "Fornitore aggiunto con successo")
    public ResponseEntity<Supplier> createSupplier(
            @RequestParam String supplierName, @RequestParam Long partitaIVA,
            @RequestParam String registeredOffice, @RequestParam String suppliesType,
            @RequestParam List<Invoice> invoices, @RequestParam Invoice invoice
    ) {
        Supplier newSupplier = supplierService.createSupplier(
                supplierName, partitaIVA, registeredOffice, suppliesType, invoices, invoice);
        return ResponseEntity.status(HttpStatus.CREATED).body(newSupplier);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli fornitore", description = "Modifica i dettagli di un fornitore trovato tramite id")
    @ApiResponse(responseCode = "200", description = "Fornitore modificato con successo")
    public Supplier updateSupplier(@PathVariable Long id,
                                   @RequestParam String supplierName, @RequestParam Long partitaIVA,
                                   @RequestParam String registeredOffice, @RequestParam String suppliesType,
                                   @RequestParam List<Invoice> invoices, @RequestParam Invoice invoice
    ) {
        Supplier updatedSupplier = supplierService.updateSupplier(
                supplierName, partitaIVA, registeredOffice, suppliesType, invoices, invoice);
        if (updatedSupplier == null) {
            logger.error("Fornitore non trovato con quell'id");
            throw new SupplierNotFoundException("Supplier not found with id: " + id);
        } else {
            return updatedSupplier;
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella fornitore", description = "Cancella fornitore dal database")
    @ApiResponse(responseCode = "200", description = "Fornitore cancellato dal database")
    public void deleteSupplier(@PathVariable Long id) {
        boolean deleted = supplierService.deleteSupplier(id);
        if (!deleted) {
            logger.error("Fornitore non trovato con quell'id");
            throw new SupplierNotFoundException("Supplier not found with id: " + id);
        }
    }
}