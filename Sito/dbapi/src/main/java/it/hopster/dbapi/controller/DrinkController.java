package it.hopster.dbapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.DrinkNotFoundException;
import it.hopster.dbapi.model.Drink;
import it.hopster.dbapi.service.DrinkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/drinks")
@Tag(name = "Gestione bevande", description = "API di gestione bevande database Hopster")
public class DrinkController {

    @Autowired
    DrinkService drinkService = new DrinkService();

    private static final Logger logger = LoggerFactory.getLogger(DrinkController.class);

    @GetMapping
    @Operation(summary = "Recupera bevande", description = "Recupera tutte le bevande sul database")
    @ApiResponse(responseCode = "200", description = "Bevande recuperate con successo")
    public List<Drink> getAllDrinks(@RequestParam(required = false) String orderBy, @RequestParam(required = false) String orderByDesc) {
        return drinkService.getAllDrinks(orderBy, orderByDesc);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera bevanda per id", description = "Torna la bevanda con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Bevanda trovata"),
            @ApiResponse(responseCode = "404", description = "Bevanda non trovata con quell'id")
    })
    public Drink getDrinkById(@PathVariable Long id) {
        Drink drink = drinkService.getDrinkById(id);
        if (drink == null) {
            logger.error("Bevanda non trovata con quell'id");
            throw new DrinkNotFoundException("Drink not found with id: " + id);
        }
        return drink;
    }

    @PostMapping
    @Operation(summary = "Aggiunge una bevanda", description = "Aggiunge una nuova bevanda sul database")
    @ApiResponse(responseCode = "200", description = "Bevanda aggiunta con successo")
    public ResponseEntity<Drink> createDrink(@RequestBody Drink drink) {
        Drink newDrink = new Drink();
        newDrink.setProduct(drink.getProduct());
        newDrink.setBrand(drink.getBrand());
        newDrink.setQuantity(drink.getQuantity());
        newDrink.setDeliveryDate(drink.getDeliveryDate());
        newDrink.setExpirationDate(drink.getExpirationDate());
        drinkService.createDrink(newDrink);
        return ResponseEntity.status(HttpStatus.CREATED).body(newDrink);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli bevanda", description = "Modifica i dettagli di una bevanda trovata tramite id")
    @ApiResponse(responseCode = "200", description = "Bevanda modificata con successo")
    public ResponseEntity<Drink> updateDrink(@PathVariable Long id, @RequestBody Drink drink) {
        Drink updatedDrink = drinkService.updateDrink(id, drink);
        return ResponseEntity.status(HttpStatus.OK).body(updatedDrink);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella bevanda", description = "Cancella bevanda dal database")
    @ApiResponse(responseCode = "200", description = "Bevanda cancellata dal database")
    public void deleteDrink(@PathVariable Long id) {
        boolean deleted = drinkService.deleteDrink(id);
        if (!deleted) {
            logger.error("Bevanda non trovata con quell'id");
            throw new DrinkNotFoundException("Drink not found with id: " + id);
        }
    }
}