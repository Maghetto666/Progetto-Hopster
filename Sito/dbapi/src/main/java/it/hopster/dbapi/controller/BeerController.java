package it.hopster.dbapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.BeerNotFoundException;
import it.hopster.dbapi.model.Beer;
import it.hopster.dbapi.service.BeerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/beers")
@Tag(name = "Gestione bevande", description = "API di gestione bevande database Hopster")
public class BeerController {

    @Autowired
    BeerService beerService;

    private static final Logger logger = LoggerFactory.getLogger(BeerController.class);

    @GetMapping
    @Operation(summary = "Recupera bevande", description = "Recupera tutte le bevande sul database")
    @ApiResponse(responseCode = "200", description = "Bevande recuperate con successo")
    public List<Beer> getAllBeers() {
        return beerService.getAllBeers();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera birra per id", description = "Torna la birra con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Birra trovata"),
            @ApiResponse(responseCode = "404", description = "Birra non trovata con quell'id")
    })
    public Beer getBeerById(@PathVariable Long id) {
        Beer beer = beerService.getBeerById(id);
        if (beer == null) {
            logger.error("Birra non trovata con quell'id");
            throw new BeerNotFoundException("Beer not found with id: " + id);
        }
        return beer;
    }

    @PostMapping
    @Operation(summary = "Aggiunge una birra", description = "Aggiunge una nuova birra sul database")
    @ApiResponse(responseCode = "200", description = "Birra aggiunta con successo")
    public ResponseEntity<Beer> createBeer(
            @RequestParam String brewery, @RequestParam String beerName,
            @RequestParam String beerStyle, @RequestParam String barrelTypeAndTap,
            @RequestParam Date fullBarrelDate, @RequestParam Date emptyBarrelDate
    ) {
        Beer newBeer = beerService.createBeer(
                brewery, beerName, beerStyle, barrelTypeAndTap, fullBarrelDate, emptyBarrelDate
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(newBeer);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli birra", description = "Modifica i dettagli di una birra trovata tramite id")
    @ApiResponse(responseCode = "200", description = "Birra modificata con successo")
    public Beer updateBeer(@PathVariable Long id,
                           @RequestParam String brewery, @RequestParam String beerName,
                           @RequestParam String beerStyle, @RequestParam String barrelTypeAndTap,
                           @RequestParam Date fullBarrelDate, @RequestParam Date emptyBarrelDate
    ) {
        Beer updatedBeer = beerService.updateBeer(
                brewery, beerName, beerStyle, barrelTypeAndTap, fullBarrelDate, emptyBarrelDate
        );
        if (updatedBeer == null) {
            logger.error("Birra non trovata con quell'id");
            throw new BeerNotFoundException("Beer not found with id: " + id);
        } else {
            return updatedBeer;
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella birra", description = "Cancella birra dal database")
    @ApiResponse(responseCode = "200", description = "Birra cancellata dal database")
    public void deleteBeer(@PathVariable Long id) {
        boolean deleted = beerService.deleteBeer(id);
        if (!deleted) {
            logger.error("Birra non trovata con quell'id");
            throw new BeerNotFoundException("Beer not found with id: " + id);
        }
    }
}