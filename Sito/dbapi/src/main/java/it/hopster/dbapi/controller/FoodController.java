package it.hopster.dbapi.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.UserNotFoundException;
import it.hopster.dbapi.model.User;
import it.hopster.dbapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Gestione utenti", description = "API di gestione utenti database Hopster")
public class FoodController {

    @Autowired
    UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    @Operation(summary = "Recupera utenti", description = "Recupera tutti gli utenti sul database")
    @ApiResponse(responseCode = "200", description = "Utenti recuperati con successo")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera utente per id", description = "Torna l'utente con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Utente trovato"),
            @ApiResponse(responseCode = "404", description = "Utente non trovato con quell'id")
    })
    public User getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            logger.error("Utente non trovato con quell'id");
            throw new UserNotFoundException("Libro not found with id: " + id);
        }
        return user;
    }

    @PostMapping
    @Operation(summary = "Aggiunge un utente", description = "Aggiunge un nuovo utente sul database")
    @ApiResponse(responseCode = "200", description = "Utente aggiunto con successo")
    public ResponseEntity<User> createUser(@RequestParam String username,
                                           @RequestParam String password,
                                           @RequestParam boolean isAdmin
    ) {
        User newUser = userService.createUser(username, password, isAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli utente", description = "Modifica i dettagli di un utente trovato tramite id")
    @ApiResponse(responseCode = "200", description = "Utente modificato con successo")
    public User updateUser(@PathVariable Long id,
                           @RequestParam String username,
                           @RequestParam String password,
                           @RequestParam boolean isAdmin
    ) {
        User updatedUser = userService.updateUser(id, username, password, isAdmin);
        if (updatedUser == null) {
            logger.error("Utente non trovato con quell'id");
            throw new UserNotFoundException("User not found with id: " + id);
        } else {
            return updatedUser;
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella utente", description = "Cancella utente dal database")
    @ApiResponse(responseCode = "200", description = "Utente cancellato dal database")
    public void deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (!deleted) {
            logger.error("Utente non trovato con quell'id");
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }

}